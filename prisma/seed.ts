import { PrismaClient, InviteStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1) Clean out any existing data (optional in dev)
  await prisma.lessonInvite.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();

  // 2) Create some teachers
  const [alice, bob] = await Promise.all([
    prisma.teacher.create({ data: { name: 'Alice', email: 'alice@school.com' } }),
    prisma.teacher.create({ data: { name: 'Bob',   email: 'bob@school.com'   } }),
  ]);

  // 3) Create some students
  const [carl, dana] = await Promise.all([
    prisma.student.create({ data: { name: 'Carl', email: 'carl@student.com' } }),
    prisma.student.create({ data: { name: 'Dana', email: 'dana@student.com' } }),
  ]);

  // 4) Seed a couple of invites
  await prisma.lessonInvite.createMany({
    data: [
      {
        teacherId: alice.id,
        studentId: carl.id,
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // tomorrow
      },
      {
        teacherId: bob.id,
        studentId: dana.id,
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // day after
      },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
