import { getListPopTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tracks = await getListPopTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
