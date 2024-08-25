import { deleteProduit } from "./deleteProduit";
import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";
import { updateProduit } from "./[id]/updateProduit";

export async function POST(req: Request) {
  console.log(req.body);

  return postProduits(req);
}

export async function GET(req: Request) {
  return getProduits(req);
}

export async function DELETE(req: Request) {
  return deleteProduit(req);
}
