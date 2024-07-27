import { deleteProduit } from "./deleteProduit";
import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";

export async function POST(req: Request) {
  return postProduits(req);
}

export async function GET() {
  return getProduits;
}

export async function DELETE() {
  return deleteProduit;
}
