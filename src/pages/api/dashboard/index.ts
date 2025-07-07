// import prisma from '../../../lib/prisma';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req : NextApiRequest, res :NextApiResponse) {
//   if (req.method !== 'GET') return res.status(405).end();

//   const { userId } = req.query;

//   const user = await prisma.user.findUnique({
//     where: { id: Number(userId) },
//     include: {
//       activity_logs: {
//         include: { habit: true },
//         orderBy: { logged_at: 'desc' },
//         take: 10,
//       },
//       user_badges: {
//         include: { badge: true },
//       },
//     },
//   });

//   res.status(200).json(user);
// }

import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { userId } = req.query;

  // Add validation for userId
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }, // Convert to number since your schema expects Int
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

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Extract commonly used fields
    const totalPoints = user.total_points;
    const currentStreak = user.current_streak;

    // Transform data to match expected format
    const activity_logs = user.activity_logs.map((log: { id: any; habit: { name: any; }; logged_at: any; points: any; }) => ({
      id: log.id,
      habit_name: log.habit?.name || 'Unknown',
      logged_at: log.logged_at,
      points: log.points || 0,
      // Add other fields as needed
    }));

    const badges = user.user_badges.map((userBadge: { badge: { id: any; name: any; description: any; icon: any; }; earned_at: any; }) => {
      // Map badge names to their corresponding SVG files
      const badgeImageMap: { [key: string]: string } = {
        'First Steps': '/badges/first-steps.svg',
        'Eco Warrior': '/badges/eco-warrior.svg',
        'Green Commuter': '/badges/green-commuter.svg',
        'Recycling Champion': '/badges/recycling-champion.svg',
        'Tree Planter': '/badges/tree-planter.svg',
        'Energy Saver': '/badges/energy-saver.svg',
        'Water Guardian': '/badges/water-guardian.svg',
        'Waste Reducer': '/badges/waste-reducer.svg',
        'Local Hero': '/badges/local-hero.svg',
        'Sustainability Master': '/badges/sustainability-master.svg',
        'Climate Champion': '/badges/climate-champion.svg',
        'Eco Legend': '/badges/eco-legend.svg'
      };

      return {
        id: userBadge.badge.id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
        icon: userBadge.badge.icon,
        imageUrl: badgeImageMap[userBadge.badge.name] || '/badges/first-steps.svg', // Default to first-steps if no match
        earned_at: userBadge.earned_at,
      };
    });

    // Return in EXACT expected format
    res.status(200).json({
      name: user.name,
      totalPoints: totalPoints,
      currentStreak: currentStreak,
      activity_logs: activity_logs,
      badges: badges
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}