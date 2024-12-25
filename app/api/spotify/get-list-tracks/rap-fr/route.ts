import { getListRapFrTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tracks = await getListRapFrTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Erreur lors de la récupération des pistes Rap-fr :", error);
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 }
    );
  }
}
