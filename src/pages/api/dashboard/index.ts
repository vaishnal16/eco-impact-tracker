import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res :NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { userId } = req.query;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    include: {
      activity_logs: {
        include: { habit: true },
        orderBy: { logged_at: 'desc' },
        take: 10,
      },
      user_badges: {
        include: { badge: true },
      },
    },
  });

  res.status(200).json(user);
}
