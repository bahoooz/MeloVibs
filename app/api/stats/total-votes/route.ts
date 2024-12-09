import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDb();
    
    const users = await User.find({}, 'votedTracks');
    const totalVotes = users.reduce((acc, user) => acc + (user.votedTracks?.length || 0), 0);
    
    return NextResponse.json({ totalVotes });
  } catch (error) {
    console.error("Erreur lors de la récupération du total des votes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du total des votes" },
      { status: 500 }
    );
  }
}
