import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import User from "@/models/user";
import type { Session } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user?.email) {
      return NextResponse.json({ tracks: [] });
    }

    await connectDb();
    
    // 1. D'abord récupérer l'utilisateur pour avoir ses votedTracks
    const user = await User.findOne({ email: session.user.email });
    
    if (!user || !user.votedTracks?.length) {
      return NextResponse.json({ tracks: [] });
    }

    console.log("VotedTracks trouvés dans la BD:", user.votedTracks);
    
    // 2. Ensuite récupérer les tracks correspondants
    const tracks = await Track.find({
      _id: { $in: user.votedTracks }
    }).select('name artists album');
    
    console.log("Tracks trouvés:", tracks);

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des tracks", tracks: [], details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
