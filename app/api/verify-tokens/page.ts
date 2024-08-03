import { verifyToken } from "@/lib/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    try {
      const user = await verifyToken(token);
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ error: "Token invalide" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
