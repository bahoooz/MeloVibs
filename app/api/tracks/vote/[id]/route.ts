import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import { authOptions } from "@/app/api/auth/auth-options";
import { getServerSession, Session } from "next-auth";
import User from "@/models/user";
import Artist from "@/models/artist";

interface Artist {
  id: string;
  name: string;
}

interface UserDocument {
  _id: string;
  email: string;
  votedTracks: string[];
  remainingVotes: number;
  lastVoteRefresh: Date;
  isAdmin: boolean;
}

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions) as Session;
    const { id: trackId } = await props.params;

    await connectDb();

    const user = await User.findOne({
      email: session.user.email,
      votedTracks: { $nin: [trackId] }
    }) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé ou vote déjà effectué" },
        { status: 400 }
      );
    }

    if (user.remainingVotes <= 0 && !user.isAdmin) {
      return NextResponse.json(
        { error: "Attendez 3 heures pour voter à nouveau" },
        { status: 400 }
      );
    }

    const track = await Track.findOneAndUpdate(
      { _id: trackId },
      { $inc: { votes: 1 } },
      { new: true, select: 'artists votes' }
    );

    if (!track) {
      return NextResponse.json({ error: "Track non trouvé" }, { status: 404 });
    }

    const [updatedUser] = await Promise.all([
      User.findOneAndUpdate(
        { email: session.user.email },
        { 
          $push: { votedTracks: trackId },
          $inc: { remainingVotes: -1 }
        },
        { new: true }
      ),
      Artist.updateMany(
        { spotifyId: { $in: track.artists.map((artist: Artist) => artist.id) } },
        { $inc: { votes: 1 } }
      )
    ]);

    return NextResponse.json({
      track,
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

    await connectDb();

    const user = await User.findOne({ email: session?.user?.email });
    if (!user?.votedTracks.includes(trackId)) {
      return NextResponse.json(
        { error: "Vous n'avez pas voté pour ce track" },
        { status: 400 }
      );
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return NextResponse.json({ error: "Track non trouvé" }, { status: 404 });
    }

    const artistUpdatePromises = track.artists.map((artist: Artist) => 
      Artist.findOneAndUpdate(
        { spotifyId: artist.id },
        { $inc: { votes: -1 } },
        { new: true }
      )
    );

    const [updatedTrack, updatedUser] = await Promise.all([
      Track.findByIdAndUpdate(trackId, { $inc: { votes: -1 } }, { new: true }),
      User.findOneAndUpdate(
        { email: session?.user?.email },
        { $pull: { votedTracks: trackId } },
        { new: true }
      ),
      ...artistUpdatePromises
    ]);

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
