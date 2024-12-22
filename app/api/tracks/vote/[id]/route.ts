import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import User from "@/models/user";
import { refreshVotes } from "@/lib/utils";

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const trackId = params.id;
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour voter" },
        { status: 401 }
      );
    }

    await connectDb();
    let user: any = await User.findOne({ email: session.user?.email });
    
    // Rafraîchir les votes disponibles
    user = await refreshVotes(user);

    if (!user.isAdmin && user.remainingVotes <= 0) {
      const now = new Date();
      const lastRefresh = new Date(user.lastVoteRefresh);
      const nextRefresh = new Date(lastRefresh.getTime() + (3 * 60 * 60 * 1000));
      
      // Calcul des heures et minutes restantes
      const timeRemaining = nextRefresh.getTime() - now.getTime();
      const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      
      // Construction du message
      let timeMessage = "";
      if (hoursRemaining > 0) {
        timeMessage += `${hoursRemaining}h`;
      }
      if (minutesRemaining > 0 || hoursRemaining === 0) {
        timeMessage += `${minutesRemaining}min`;
      }

      return NextResponse.json(
        { error: `Vous n'avez plus de votes disponibles. Prochain vote dans ${timeMessage}.` },
        { status: 400 }
      );
    }

    if (user?.votedTracks.includes(trackId)) {
      return NextResponse.json(
        { error: "Vous avez déjà voté pour ce track" },
        { status: 400 }
      );
    }

    const [updatedTrack, updatedUser] = await Promise.all([
      Track.findByIdAndUpdate(trackId, { $inc: { votes: 1 } }, { new: true }),
      User.findOneAndUpdate(
        { email: session?.user?.email },
        { 
          $push: { votedTracks: trackId },
          $inc: { remainingVotes: -1 }
        },
        { new: true }
      )
    ]);
    if (!updatedTrack) {
      return NextResponse.json({ error: "Track non trouvé" }, { status: 404 });
    }

    return NextResponse.json({
      track: updatedTrack,
      votedTracks: updatedUser?.votedTracks,
      remainingVotes: updatedUser?.remainingVotes
    });
  } catch (error) {
    console.error("Erreur lors du vote", error);
    return NextResponse.json({ error: "Erreur lors du vote" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const trackId = params.id;
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour retirer votre vote" },
        { status: 401 }
      );
    }

    await connectDb();

    const user = await User.findOne({ email: session?.user?.email });
    if (!user?.votedTracks.includes(trackId)) {
      return NextResponse.json(
        { error: "Vous n'avez pas voté pour ce track" },
        { status: 400 }
      );
    }

    const [updatedTrack, updatedUser] = await Promise.all([
      Track.findByIdAndUpdate(trackId, { $inc: { votes: -1 } }, { new: true }),
      User.findOneAndUpdate(
        { email: session?.user?.email },
        { $pull: { votedTracks: trackId } },
        { new: true }
      ),
    ]);

    if (!updatedTrack) {
      return NextResponse.json({ error: "Track non trouvé" }, { status: 404 });
    }

    return NextResponse.json({
      track: updatedTrack,
      votedTracks: updatedUser?.votedTracks,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du vote", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du vote" },
      { status: 500 }
    );
  }
}
