// import prisma from '../../../lib/prisma';
// import { NextApiRequest,NextApiResponse } from 'next';
// import bcrypt from 'bcrypt';

// export default async function handler(req : NextApiRequest, res : NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//   const valid = await bcrypt.compare(password, user.password_hash);
//   if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

//   res.status(200).json({ message: 'Login success', user });
// }


import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  // CORRECTED: Return in expected format
  res.status(200).json({ 
    id: user.id, 
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      // Add other user fields as needed, but exclude password_hash
    }
  });
}