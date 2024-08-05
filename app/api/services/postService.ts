import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function postService(req: Request) {
  try {
    const { nom, description } = await req.json();
    const service = await prisma.service.create({
      data: {
        nom,
        description,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.error();
  }
}
