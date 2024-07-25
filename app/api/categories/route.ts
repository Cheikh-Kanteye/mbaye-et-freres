import { getCategories } from "./getCategories";
import { postCategorie } from "./postCategories";

export async function GET() {
  return await getCategories();
}

export async function POST(req: Request) {
  return await postCategorie(req);
}
