import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes GET
export async function getServices() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({
      error: "Erreur lors de la récupération des services",
    });
  }
}
