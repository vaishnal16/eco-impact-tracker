import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get top 10 users by points
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        total_points: true,
        current_streak: true,
        user_badges: {
          include: {
            badge: true
          }
        }
      },
      orderBy: {
        total_points: 'desc'
      },
      take: 10
    });

    // Transform the data to include badge count
    const leaderboardData = topUsers.map((user, index) => ({
      id: user.id,
      name: user.name,
      rank: index + 1,
      total_points: user.total_points,
      current_streak: user.current_streak,
      badge_count: user.user_badges.length,
      // Add medal emoji for top 3
      medal: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null
    }));

    return res.status(200).json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
}
