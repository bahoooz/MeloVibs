import { getListRnBTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tracks = await getListRnBTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Erreur lors de la récupération des pistes R&B :", error);
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
