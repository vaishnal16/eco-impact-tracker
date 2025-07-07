import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `Generate a short multiple choice question about environmental awareness.

Return a JSON object in this exact format (no code blocks or extra text):
{
  "question": "short question here",
  "options": ["brief option 1", "brief option 2", "brief option 3", "brief option 4"],
  "correctAnswer": 0,
  "explanation": "brief 1-2 sentence explanation"
}

Requirements:
- Keep question under 15 words
- Keep each option under 10 words
- Keep explanation under 30 words
- correctAnswer must be 0-3
- No markdown or code blocks
- Properly escape quotes`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
            topP: 0.8,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    // First get the response text
    const responseText = await response.text();
    
    // Log the full response for debugging
    console.log('Gemini API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });

    if (!response.ok) {
      let errorMessage = 'Failed to generate question';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        // If we can't parse the error as JSON, use the raw text
        errorMessage = responseText || errorMessage;
      }
      console.error('Gemini API Error:', errorMessage);
      return res.status(500).json({ error: errorMessage });
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Gemini API response as JSON:', responseText);
      return res.status(500).json({ error: 'Invalid response format from Gemini API' });
    }

    // Extract the generated text from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      console.error('Invalid Gemini API response structure:', data);
      return res.status(500).json({ error: 'Invalid response format from Gemini API' });
    }

    try {
      // Clean up the text by removing any markdown code block markers and trim whitespace
      const cleanedText = generatedText
        .replace(/^```json\s*/, '')  // Remove opening code block
        .replace(/\s*```$/, '')      // Remove closing code block
        .replace(/\n\s*/g, ' ')      // Replace newlines and extra spaces with single space
        .trim();

      // Try to parse the cleaned text as JSON
      const quizData = JSON.parse(cleanedText);
      
      // Validate the quiz data structure
      if (!quizData.question || !Array.isArray(quizData.options) || 
          quizData.options.length !== 4 || typeof quizData.correctAnswer !== 'number' ||
          !quizData.explanation) {
        console.error('Invalid quiz data structure:', quizData);
        return res.status(500).json({ error: 'Invalid quiz data structure' });
      }

      // Additional validation for length limits
      if (quizData.question.split(' ').length > 15 ||
          quizData.options.some((opt: string) => opt.split(' ').length > 10) ||
          quizData.explanation.split(' ').length > 30) {
        console.error('Content exceeds length limits:', quizData);
        return res.status(500).json({ error: 'Generated content exceeds length limits' });
      }
      
      return res.status(200).json(quizData);
    } catch (parseError) {
      console.error('Failed to parse quiz data:', parseError, 'Raw text:', generatedText);
      return res.status(500).json({ 
        error: 'Failed to parse quiz data',
        details: generatedText
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 