import { getListKPopArtists } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artists = await getListKPopArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artistes K-Pop :",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}
