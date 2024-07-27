import { POST } from "./postProduits";
import { GET } from "./getProduits";
import { PUT } from "./updateProduit";
import { DELETE } from "./deleteProduit";
import { NextResponse } from "next/server";

export async function handler(
  req: Request,
  { params }: { params: { id: string } }
) {
  switch (req.method) {
    case "POST":
      return POST(req);
    case "GET":
      return GET(req, { params });
    case "PUT":
      return PUT(req, { params });
    case "DELETE":
      return DELETE(req, { params });
    default:
      return new NextResponse("Method Not Allowed", { status: 405 });
  }
}
