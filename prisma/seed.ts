import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1) Clean existing data (order matters due to FK constraints)
  await prisma.userBadge.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.user.deleteMany();

  // 2) Seed Users -----------------------------------------------------------
  const password = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice.green@example.com',
        name: 'Alice Green',
        password_hash: password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.brown@example.com',
        name: 'Bob Brown',
        password_hash: password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie.earth@example.com',
        name: 'Charlie Earth',
        password_hash: password,
      },
    }),
  ]);

  // 3) Seed Habits ---------------------------------------------------------
  const habitData = [
    {
      name: 'Plant a tree',
      description: 'Planting a new tree or caring for an existing one.',
      points_value: 50,
      carbon_saving_kg: 5,
    },
    {
      name: 'Cycle to work',
      description: 'Commute by bicycle instead of using a car.',
      points_value: 20,
      carbon_saving_kg: 1.5,
    },
    {
      name: 'Use public transport',
      description: 'Take a bus/train/tram instead of driving.',
      points_value: 15,
      carbon_saving_kg: 1,
    },
    {
      name: 'Reduce water usage',
      description: 'Shorten your shower or reuse grey water.',
      points_value: 10,
      waste_saving_kg: 0.5,
    },
    {
      name: 'Recycle household waste',
      description: 'Separate and recycle paper, plastic, and glass.',
      points_value: 12,
      waste_saving_kg: 2,
    },
  ];

  const habits = await Promise.all(
    habitData.map((h) => prisma.habit.create({ data: h }))
  );

  // 4) Seed Badges ---------------------------------------------------------
  const badgeData = [
    {
      name: 'Seedling',
      description: 'Earn 100 eco points',
      icon: '/badges/seedling.svg',
      points_threshold: 100,
    },
    {
      name: 'Sapling',
      description: 'Earn 300 eco points',
      icon: '/badges/sapling.svg',
      points_threshold: 300,
    },
    {
      name: 'Tree Hugger',
      description: 'Earn 600 eco points',
      icon: '/badges/tree-hugger.svg',
      points_threshold: 600,
    },
    {
      name: 'Forest Guardian',
      description: 'Earn 1000 eco points',
      icon: '/badges/forest-guardian.svg',
      points_threshold: 1000,
    },
  ];

  const badges = await Promise.all(
    badgeData.map((b) => prisma.badge.create({ data: b }))
  );

  // 5) Seed Activity Logs & accumulate points -----------------------------
  const today = new Date();

  for (const user of users) {
    let total = 0;

    // Each user gets 5 logs on different days & habits
    for (let i = 0; i < 5; i++) {
      const habit = habits[(i + user.id) % habits.length];
      const logDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);

      await prisma.activityLog.create({
        data: {
          user_id: user.id,
          habit_id: habit.id,
          points: habit.points_value,
          logged_at: logDate,
          notes: `Did ${habit.name.toLowerCase()} on ${logDate.toDateString()}.`,
        },
      });

      total += habit.points_value;
    }

    // Update user total points
    await prisma.user.update({
      where: { id: user.id },
      data: { total_points: total },
    });

    // 6) Award badges based on thresholds
    const earned = badges.filter((badge) => badge.points_threshold <= total);

    for (const badge of earned) {
      await prisma.userBadge.create({
        data: {
          user_id: user.id,
          badge_id: badge.id,
          // earned_at defaults to now()
        },
      });
    }
  }

  console.log('🌱 Database has been seeded. Happy hacking!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 