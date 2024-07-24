import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";

export async function GET() {
  return await getProduits();
}

export async function POST(req: Request) {
  return await postProduits(req);
}
