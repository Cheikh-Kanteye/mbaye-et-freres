import { NextRequest } from "next/server";
import { getProduits } from "./getProduits";
import { postProduits } from "./postProduits";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  return await getProduits();
}

export async function POST(req: Request) {
  return await postProduits(req);
}
