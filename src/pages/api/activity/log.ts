import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { user_id, habit_id, notes } = req.body;

  const habit = await prisma.habit.findUnique({ where: { id: habit_id } });
  if (!habit) return res.status(400).json({ error: 'Habit not found' });

  // 1. Create ActivityLog
  const log = await prisma.activityLog.create({
    data: {
      user_id,
      habit_id,
      notes,
    },
  });

  // 2. Update total_points
  await prisma.user.update({
    where: { id: user_id },
    data: { total_points: { increment: habit.points_value } },
  });

  // 3. Check if new badges should be awarded
  const user = await prisma.user.findUnique({ where: { id: user_id } });

  const earnedBadges = await prisma.badge.findMany({
    where: {
      points_threshold: {
        lte: user.total_points,
      },
      user_badges: {
        none: {
          user_id: user.id,
        },
      },
    },
  });

  for (const badge of earnedBadges) {
    await prisma.userBadge.create({
      data: {
        user_id: user.id,
        badge_id: badge.id,
      },
    });
  }

  res.status(200).json({ message: 'Activity logged and badge(s) updated', log });
}
