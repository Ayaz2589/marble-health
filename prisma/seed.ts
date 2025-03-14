// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Helper function to get Monday of the current week (assuming Monday as the first day).
 */
function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust if day is Sunday (day === 0)
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  // 1) Ensure we have a user to attach events to
  const user = await prisma.user.upsert({
    where: { username: 'seeduser' },
    update: {}, // if user already exists, do nothing
    create: {
      username: 'seeduser',
      password: 'password',
    },
  });

  // 2) Calculate Monday of the current week
  const now = new Date();
  const monday = getMonday(now);

  // 3) Define 4 events for the current week (Mon-Fri)
  //    We'll spread them across different days/hours as an example
  const eventsData = [
    {
      title: 'Event 1 (Monday 9-10 AM)',
      start: new Date(monday.getTime() + 9 * 60 * 60 * 1000),  // Monday 9 AM
      end: new Date(monday.getTime() + 10 * 60 * 60 * 1000),   // Monday 10 AM
      userId: user.id,
    },
    {
      title: 'Event 2 (Wednesday 2-3 PM)',
      // Monday + 2 days => Wednesday
      start: new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
      end: new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
      userId: user.id,
    },
    {
      title: 'Event 3 (Thursday 1-2 PM)',
      // Monday + 3 days => Thursday
      start: new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000),
      end: new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
      userId: user.id,
    },
    {
      title: 'Event 4 (Friday 3-4 PM)',
      // Monday + 4 days => Friday
      start: new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
      end: new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000),
      userId: user.id,
    },
  ];

  // 4) Create the events in bulk
  await prisma.event.createMany({ data: eventsData });

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
