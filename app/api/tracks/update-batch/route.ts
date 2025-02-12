import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import { updateTracksDataBatch } from "@/lib/spotify";

export async function POST(request: Request) {
  try {
    const { startIndex, batchSize = 20 } = await request.json();
    
    await connectDb();
    
    // Récupérer un lot de tracks qui n'ont pas été mis à jour depuis plus d'un jour
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const tracks = await Track.find({
      $or: [
        { lastUpdated: { $lt: oneDayAgo } },
        { lastUpdated: { $exists: false } }
      ]
    })
    .skip(startIndex)
    .limit(batchSize)
    .select('spotifyId');

    if (tracks.length === 0) {
      return NextResponse.json({ done: true });
    }

    const trackIds = tracks.map(track => track.spotifyId);
    await updateTracksDataBatch(trackIds);

    return NextResponse.json({ 
      done: false,
      nextIndex: startIndex + batchSize,
      processedCount: tracks.length
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du batch:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
