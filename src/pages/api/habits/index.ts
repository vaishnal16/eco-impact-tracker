// import prisma from '../../../lib/prisma';
// import { NextApiRequest,NextApiResponse } from 'next';

// export default async function handler(req : NextApiRequest, res : NextApiResponse) {
//   if (req.method !== 'GET') return res.status(405).end();

//   const habits = await prisma.habit.findMany();
//   res.status(200).json(habits);
// }

import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const habits = await prisma.habit.findMany({
      select: {
        id: true,
        name: true,
        points_value: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return res.status(200).json(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    return res.status(500).json({ error: 'Failed to fetch habits' });
  }
}
