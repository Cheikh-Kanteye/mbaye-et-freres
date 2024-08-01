import { deleteFamille } from "./deleteFamille";
import { getFamilles } from "./getFamilles";
import { postFamille } from "./postFamilles";

export async function GET() {
  return await getFamilles();
}

export async function POST(req: Request) {
  return await postFamille(req);
}

export async function DELETE(req: Request) {
  return deleteFamille(req);
}
