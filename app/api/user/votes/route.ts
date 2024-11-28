import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import type { Session } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user?.email) {
      return NextResponse.json({ votedTracks: [] });
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ votedTracks: [] });
    }

    return NextResponse.json({ votedTracks: user.votedTracks });
  } catch (error) {
    console.error("Erreur lors de la récupération des votes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des votes", votedTracks: [] },
      { status: 500 }
    );
  }
}