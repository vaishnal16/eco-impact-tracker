# 🌱 Eco Impact Tracker

A modern web application that helps users track and reduce their environmental impact through daily activities, learning resources, and gamification.

## 🚀 Features

### 1. Carbon Footprint Tracking
- Personal carbon footprint calculator
- Daily activity logging
- Real-time impact visualization
- Progress tracking over time

### 2. Analytics Dashboard
- Comprehensive environmental impact metrics
- Interactive charts and visualizations
- Progress trends and patterns
- Personalized insights and recommendations

### 3. Achievement System
- Earn eco-badges for sustainable actions
- Track progress through different achievement levels
- Unlock special rewards and recognition
- Visual badge showcase

### 4. Learning Hub
- Educational resources on sustainability
- Tips for eco-friendly living
- Categorized learning materials
- Progress tracking for completed lessons

### 5. Interactive Eco Quiz
- AI-powered environmental knowledge quizzes
- Learn while having fun
- Track quiz scores and improvements
- Regular new questions and challenges

### 6. Activity Logging
- Easy-to-use activity input interface
- Track multiple eco-friendly habits
- Points system for activities
- Daily streaks and achievements

### 7. Leaderboard System
- Compete with other eco-warriors
- Global and local rankings
- Point-based competition
- Monthly/weekly challenges

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: Mysql with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)


## 📦 Project Structure

```
eco-impact-tracker/
├── src/
│   ├── app/                 # Next.js 13 app directory
│   │   ├── analytics/      # Analytics page
│   │   ├── badges/        # Badges showcase
│   │   ├── dashboard/     # User dashboard
│   │   ├── ecoquiz/      # Interactive quiz
│   │   ├── footprint/    # Carbon footprint calculator
│   │   ├── learn/        # Learning resources
│   │   ├── log/          # Activity logging
│   │   └── page.tsx      # Home page
│   ├── components/        # Reusable components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── pages/            # API routes
├── prisma/               # Database schema and migrations
├── public/              # Static assets
└── package.json         # Project dependencies
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eco-impact-tracker.git
   cd eco-impact-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   ```
   Visit http://localhost:3000
   ```

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="mysql://user:password@localhost:5432/eco_impact_db"
JWT_SECRET="your-jwt-secret"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```


## 📧 Contact

For any suggestions, please reach out to:
- Email: your.email@example.com
- GitHub: [Your GitHub Profile](https://github.com/vaishnal16)

---
Made with 💚 for a greener planet
