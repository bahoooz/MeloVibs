import { getListJazzTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tracks = await getListJazzTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Erreur lors de la récupération des pistes Jazz :", error);
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
