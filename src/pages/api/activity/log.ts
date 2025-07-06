// import prisma from '../../../lib/prisma';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req : NextApiRequest, res : NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { user_id, habit_id, notes } = req.body;

//   const habit = await prisma.habit.findUnique({ where: { id: habit_id } });
//   if (!habit) return res.status(400).json({ error: 'Habit not found' });

//   // 1. Create ActivityLog
//   const log = await prisma.activityLog.create({
//     data: {
//       user_id,
//       habit_id,
//       notes,
//     },
//   });

//   // 2. Update total_points
//   await prisma.user.update({
//     where: { id: user_id },
//     data: { total_points: { increment: habit.points_value } },
//   });

//   // 3. Check if new badges should be awarded
//   const user = await prisma.user.findUnique({ where: { id: user_id } });

//   const earnedBadges = await prisma.badge.findMany({
//     where: {
//       points_threshold: {
//         lte: user.total_points,
//       },
//       user_badges: {
//         none: {
//           user_id: user.id,
//         },
//       },
//     },
//   });

//   for (const badge of earnedBadges) {
//     await prisma.userBadge.create({
//       data: {
//         user_id: user.id,
//         badge_id: badge.id,
//       },
//     });
//   }

//   res.status(200).json({ message: 'Activity logged and badge(s) updated', log });
// }


import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, habit_id, notes } = req.body;

    // Validate required fields
    if (!user_id || !habit_id) {
      return res.status(400).json({ error: 'User ID and Habit ID are required' });
    }

    // Check if habit exists
    const habit = await prisma.habit.findUnique({ 
      where: { id: habit_id } 
    });
    
    if (!habit) {
      return res.status(400).json({ error: 'Habit not found' });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: user_id }
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx: { activityLog: { create: (arg0: { data: { user_id: any; habit_id: any; notes: any; }; }) => any; }; user: { update: (arg0: { where: { id: any; }; data: { total_points: { increment: any; }; }; }) => any; }; badge: { findMany: (arg0: { where: { points_threshold: { lte: any; }; user_badges: { none: { user_id: any; }; }; }; }) => any; }; userBadge: { create: (arg0: { data: { user_id: any; badge_id: any; }; }) => any; }; }) => {
      // 1. Create ActivityLog
      const log = await tx.activityLog.create({
        data: {
          user_id,
          habit_id,
          notes: notes || null,
        },
      });

      // 2. Update total_points
      const updatedUser = await tx.user.update({
        where: { id: user_id },
        data: { 
          total_points: { 
            increment: habit.points_value || 0 
          } 
        },
      });

      // 3. Check if new badges should be awarded
      const earnedBadges = await tx.badge.findMany({
        where: {
          points_threshold: {
            lte: updatedUser.total_points,
          },
          user_badges: {
            none: {
              user_id: user_id,
            },
          },
        },
      });

      // 4. Award new badges
      const newBadges = [];
      for (const badge of earnedBadges) {
        await tx.userBadge.create({
          data: {
            user_id: user_id,
            badge_id: badge.id,
          },
        });
        newBadges.push(badge);
      }

      return {
        log,
        pointsEarned: habit.points_value || 0,
        totalPoints: updatedUser.total_points,
        newBadges,
      };
    });

    return res.status(200).json({
      message: 'Activity logged successfully',
      ...result,
    });

  } catch (error) {
    console.error('Error logging activity:', error);
    return res.status(500).json({ error: 'Failed to log activity' });
  }
}
