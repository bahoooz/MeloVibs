import { NextResponse } from "next/server";

import connectDb from "@/lib/mongodb";
import Artist from "@/models/artist";

export async function GET() {
  try {
    await connectDb();
    const artists = await Artist.find({
      genres: "pop"
    });
    return NextResponse.json(artists);
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des artistes" },
      { status: 500 }
    );
  }
}
