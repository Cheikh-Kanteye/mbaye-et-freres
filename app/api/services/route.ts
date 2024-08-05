import { postService } from "./postService";
import { deleteService } from "./deleteService";
import { getServices } from "./getServices";

export async function GET() {
  return getServices();
}

export async function POST(req: Request) {
  return await postService(req);
}

export async function DELETE(req: Request) {
  return deleteService(req);
}
