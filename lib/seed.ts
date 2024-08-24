import prisma from "./prisma";
import bcrypt from "bcrypt";

async function createDefaultUsers() {
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log("Les utilisateurs par défaut existent déjà.");
    return;
  }

  // Créer des utilisateurs par défaut
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_USER_PWD || "",
    saltRounds
  );

  await prisma.user.createMany({
    data: [
      {
        nom: process.env.DEFAULT_USER_1_NAME!,
        email: process.env.DEFAULT_USER_1_EMAIL!,
        motDePasse: hashedPassword,
      },
      {
        nom: process.env.DEFAULT_USER_2_NAME!,
        email: process.env.DEFAULT_USER_2_EMAIL!,
        motDePasse: hashedPassword,
      },
    ],
  });

  console.log("Utilisateurs par défaut créés avec succès.");
}

createDefaultUsers();
