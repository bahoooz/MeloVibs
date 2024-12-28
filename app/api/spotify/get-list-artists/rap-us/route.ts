import { getListRapUSArtists } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artists = await getListRapUSArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artistes Rap US :",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}
