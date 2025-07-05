import prisma from '../../../lib/prisma';
import { NextApiRequest,NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const habits = await prisma.habit.findMany();
  res.status(200).json(habits);
}
