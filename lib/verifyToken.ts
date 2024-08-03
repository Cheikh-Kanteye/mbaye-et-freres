import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function verifyToken(token: string) {
  try {
    // Vérifiez et décodez le token avec jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    console.log("Decoded Payload:", payload); // Log du payload décodé

    // Retournez le payload décodé
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error); // Log de l'erreur pour débogage
    return null; // Retourne null si une erreur survient
  }
}
