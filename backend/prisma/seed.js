import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Limpar tabelas na ordem correta
  await prisma.studentAction.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.action.deleteMany();
  
  // ACTIONS  
  await prisma.action.createMany({
    data: [
      // POSITIVE
      {
        title: "Plant a Tree",
        description: "Helping increase green areas.",
        type: "POSITIVE",
        points: 15,
        imageUrl: "/images/planet-feliz.png",
        audioUrl: "/audios/plant-tree-en.mp3",
      },
      {
        title: "Recycle Properly",
        description: "Correctly separate recyclable waste.",
        type: "POSITIVE",
        points: 10,
        imageUrl: "/images/planet-cozy.png",
        audioUrl: "/audios/recycle-goodjob-en.mp3",
      },
      {
        title: "Used a Bicycle",
        description: "Reduced carbon emissions by biking.",
        type: "POSITIVE",
        points: 10,
        imageUrl: "/images/planet-cozy.png",
        audioUrl: "/audios/used-bike-es.mp3",
      },
      {
        title: "Used Reusable Bag",
        description: "Avoided plastic bag usage.",
        type: "POSITIVE",
        points: 8,
        imageUrl: "/images/planet-cozy.png",
        audioUrl: "/audios/used-reusable-bag-ja.mp3",
      },

      // NEUTRAL
      {
        title: "Used Natural Light",
        description: "Reduced electricity consumption.",
        type: "NEUTRAL",
        points: 5,
        imageUrl: "/images/planet-neutral.png",
        audioUrl: "/audios/used-natural-light-zh.mp3",
      },
      {
        title: "Saved Energy",
        description: "Turned off unnecessary devices.",
        type: "NEUTRAL",
        points: 6,
        imageUrl: "/images/planet-neutral.png",
        audioUrl: "/audios/saved-energy-fr.mp3",
      },
      {
        title: "Used Recycled Paper",
        description: "Helped reduce deforestation.",
        type: "NEUTRAL",
        points: 4,
        imageUrl: "/images/planet-neutral.png",
        audioUrl: "/audios/used-recycled-paper-fr.mp3",
      },
      {
        title: "Turned Off Tap While Brushing",
        description: "Saved water while brushing teeth.",
        type: "NEUTRAL",
        points: 5,
        imageUrl: "/images/planet-neutral.png",
        audioUrl: "/audios/saved-water-teeth-es.mp3",
      },

      // NEGATIVE
      {
        title: "Burned Trash",
        description: "Released harmful gases into the air.",
        type: "NEGATIVE",
        points: -15,
        imageUrl: "/images/planet-sick.png",
        audioUrl: "/audios/burned-trash-it.mp3",
      },
      {
        title: "Littered the Street",
        description: "Polluted public spaces.",
        type: "NEGATIVE",
        points: -12,
        imageUrl: "/images/planet-sick.png",
        audioUrl: "/audios/littered-street-it.mp3",
      },
      {
        title: "Polluted a River",
        description: "Damaged aquatic ecosystems.",
        type: "NEGATIVE",
        points: -15,
        imageUrl: "/images/planet-sick.png",
        audioUrl: "/audios/polluted-river-zh.mp3",
      },
      {
        title: "Left Tap Open",
        description: "Wasted clean water unnecessarily.",
        type: "NEGATIVE",
        points: -10,
        imageUrl: "/images/planet-sick.png",
        audioUrl: "/audios/left-tap-open-ja.mp3",
      },
    ],
  });
  
  // CREATE DEFAULT TEACHER 
  const teacherPassword = await bcrypt.hash("123Adm", 10);

  const teacherUser = await prisma.user.create({
    data: {
      name: "Admin Teacher",
      email: "theAdm@climate.com",
      password: teacherPassword,
      role: "TEACHER",
    },
  });

  await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
    },
  });

  console.log(" Teacher criado com sucesso!");
  console.log(" Seed finalizado com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });