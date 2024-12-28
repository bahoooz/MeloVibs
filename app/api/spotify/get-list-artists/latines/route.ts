import { getListLatinesArtists } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artists = await getListLatinesArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artistes Latines :",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}
