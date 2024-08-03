import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET as string;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Méthode non autorisée" },
      { status: 405 }
    );
  }

  try {
    const { email, password } = await req.json();

    // Validation des entrées
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.motDePasse))) {
      // Générer un token JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Créer une session
      await prisma.session.create({
        data: {
          userId: user.id,
          token,
          expires: new Date(Date.now() + 3600000), // 1 heure
        },
      });

      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
      );
      return NextResponse.json({ success: true }, { status: 200, headers });
    } else {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
