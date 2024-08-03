import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";
import type { NextMiddleware } from "next/server";

const middleware: NextMiddleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (token) {
    const payload = await verifyToken(token);

    if (payload && payload.userId) {
      // L'utilisateur est authentifié, passe au prochain middleware ou à la route
      return NextResponse.next();
    }
  }

  // Redirige vers la page de connexion si le token est invalide ou absent
  return NextResponse.redirect(new URL("/login", req.url));
};

export default middleware;

export const config = {
  matcher: ["/admin/:path*"], // Appliquer le middleware aux routes protégées
};
