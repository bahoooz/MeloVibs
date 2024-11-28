import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import User from "@/models/user";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trackId = await params.id;
    const session = await getServerSession(authOptions) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Vous devez être connecté pour voter" }, { status: 401 });
    }

    await connectDb();
    const user = await User.findOne({ email: session.user?.email });
    if (user?.votedTracks.includes(trackId)) {
      return NextResponse.json({ error: "Vous avez déjà voté pour ce track" }, { status: 400 });
    }

    const [updatedTrack, updatedUser] = await Promise.all([
      Track.findByIdAndUpdate(
        trackId,
        { $inc: { votes: 1 } },
        { new: true }
      ),
      User.findOneAndUpdate(
        { email: session?.user?.email },
        { $push: { votedTracks: trackId } },
        { new: true }
      )
    ])
    if (!updatedTrack) {
      return NextResponse.json(
        { error: "Track non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      track: updatedTrack,
      votedTracks: updatedUser?.votedTracks
    })

  } catch (error) {
    console.error("Erreur lors du vote", error);
    return NextResponse.json(
      { error: "Erreur lors du vote" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    // 1. Vérifier si l'utilisateur est connecté
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Vous devez être connecté pour retirer votre vote" }, { status: 401 });
    }

    await connectDb();

    // 2. Vérifier si l'utilisateur a bien voté pour ce track
    const user = await User.findOne({ email: session?.user?.email });
    if (!user?.votedTracks.includes(params.id)) {
      return NextResponse.json({ error: "Vous n'avez pas voté pour ce track" }, { status: 400 });
    }

    // 3. Mettre à jour le track ET l'utilisateur en parallèle

    const [updatedTrack, updatedUser] = await Promise.all([
      // Décrémenter le compteur de votes du track
      Track.findByIdAndUpdate(
        params.id,
        { $inc: { votes: -1 } },
        { new: true }
      ),
      // Retirer l'ID du track des votes de l'utilisateur
      User.findOneAndUpdate({ email: session?.user?.email },
        { $pull: { votedTracks: params.id } },
        { new: true }
      )
    ])

    if (!updatedTrack) {
      return NextResponse.json(
        { error: "Track non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ track: updatedTrack, votedTracks: updatedUser?.votedTracks });
  } catch (error) {
    console.error("Erreur lors de la suppression du vote", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du vote" },
      { status: 500 }
    );
  }
} 