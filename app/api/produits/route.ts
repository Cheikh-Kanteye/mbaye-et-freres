import { deleteProduit } from "./deleteProduit";
import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";

export async function POST() {
  return postProduits;
}

export async function GET() {
  return getProduits;
}

export async function DELETE() {
  return deleteProduit;
}
