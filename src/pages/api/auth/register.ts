import prisma from '../../../lib/prisma';
import { NextApiRequest,NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, name, password_hash },
  });

  res.status(201).json({ message: 'User created', userId: user.id });
}
