import bcrypt from "bcrypt";
import prisma from "./prisma";

async function createDefaultUsers() {
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log("Les utilisateurs par défaut existent déjà.");
    return;
  }

  // Créer des utilisateurs par défaut
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("defaultpassword", saltRounds);

  await prisma.user.createMany({
    data: [
      {
        nom: "admin",
        email: "admin@example.com",
        motDePasse: hashedPassword,
      },
      {
        nom: "user",
        email: "user@example.com",
        motDePasse: hashedPassword,
      },
    ],
  });

  console.log("Utilisateurs par défaut créés avec succès.");
}

createDefaultUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
