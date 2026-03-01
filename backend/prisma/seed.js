import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.studentAction.deleteMany();
  await prisma.action.deleteMany();

  await prisma.action.createMany({
    data: [
      // POSITIVE
      {
        title: "Reciclar lixo",
        description: "Separar corretamente o lixo reciclável.",
        type: "POSITIVE",
        points: 10,
        imageUrl: "/images/planet_happy.png",
        audioUrl: "/audios/recycle.mp3",
      },
      {
        title: "Plantar uma árvore",
        description: "Contribuir para aumentar áreas verdes.",
        type: "POSITIVE",
        points: 15,
        imageUrl: "/images/planet_super_happy.png",
        audioUrl: "/audios/plant_tree.mp3",
      },

      // NEUTRAL
      {
        title: "Usar transporte público",
        description: "Reduz a emissão de gases poluentes.",
        type: "NEUTRAL",
        points: 5,
        imageUrl: "/images/planet_normal.png",
        audioUrl: "/audios/bus.mp3",
      },

      // NEGATIVE
      {
        title: "Desperdiçar água",
        description: "Deixar torneira aberta sem necessidade.",
        type: "NEGATIVE",
        points: -10,
        imageUrl: "/images/planet_sad.png",
        audioUrl: "/audios/waste_water.mp3",
      },
      {
        title: "Jogar lixo no chão",
        description: "Polui o meio ambiente.",
        type: "NEGATIVE",
        points: -15,
        imageUrl: "/images/planet_very_sad.png",
        audioUrl: "/audios/trash_ground.mp3",
      },
    ],
  });

  console.log("✅ Seed finalizado com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });