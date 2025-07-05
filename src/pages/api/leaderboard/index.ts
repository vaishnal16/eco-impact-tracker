import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const topUsers = await prisma.user.findMany({
    orderBy: { total_points: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      total_points: true,
    },
  });

  res.status(200).json(topUsers);
}
