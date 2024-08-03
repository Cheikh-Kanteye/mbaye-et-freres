import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded: any = verify(token, JWT_SECRET);

      // Supprimer la session de la base de données
      await prisma.session.delete({
        where: { token },
      });

      // Supprimer le cookie
      res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(400).json({ error: "No token found" });
  }
}
