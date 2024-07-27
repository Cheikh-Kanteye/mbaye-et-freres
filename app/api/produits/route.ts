import { deleteProduit } from "./deleteProduit";
import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";

export async function POST(req: Request) {
  return postProduits(req);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return getProduits(req, id);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return deleteProduit(req, id);
}
