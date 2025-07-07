import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = Number(req.query.userId);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Valid userId is required' });
  }

  try {
    // Get the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Get daily points for last 7 days
    const dailyPoints = await prisma.activityLog.groupBy({
      by: ['logged_at'],
      where: {
        user_id: userId,
        logged_at: {
          gte: sevenDaysAgo
        }
      },
      _sum: {
        points: true
      }
    });

    // Get habit-wise breakdown
    const habitBreakdown = await prisma.activityLog.groupBy({
      by: ['habit_id'],
      where: {
        user_id: userId,
        logged_at: {
          gte: sevenDaysAgo
        }
      },
      _count: true,
      _sum: {
        points: true
      }
    });

    // Get habit names for the breakdown
    const habits = await prisma.habit.findMany({
      where: {
        id: {
          in: habitBreakdown.map(h => h.habit_id)
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    // Format daily points data
    const dailyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const entry = dailyPoints.find(d => {
        const logDate = new Date(d.logged_at);
        return logDate.toDateString() === date.toDateString();
      });

      return {
        date: date.toISOString().split('T')[0],
        points: entry?._sum.points || 0
      };
    }).reverse();

    // Format habit breakdown data
    const habitData = habitBreakdown.map(habit => {
      const habitInfo = habits.find(h => h.id === habit.habit_id);
      return {
        name: habitInfo?.name || 'Unknown',
        count: habit._count,
        points: habit._sum.points || 0
      };
    });

    return res.status(200).json({
      dailyPoints: dailyData,
      habitBreakdown: habitData
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
} 