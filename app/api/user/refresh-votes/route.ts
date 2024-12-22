import { NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function POST() {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    await connectDb();
    
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const now = new Date();
    const lastRefresh = new Date(user.lastVoteRefresh);
    const timeSinceLastRefresh = now.getTime() - lastRefresh.getTime();
    const threeHours = 3 * 60 * 60 * 1000;

    // Calculer combien de périodes de 3 heures se sont écoulées
    const periodsElapsed = Math.floor(timeSinceLastRefresh / threeHours);
    
    if (periodsElapsed > 0) {
      // Calculer le nombre de votes à ajouter (2 par période)
      const votesToAdd = Math.min(periodsElapsed * 2, 10 - (user.remainingVotes || 0));

      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        {
          $set: { lastVoteRefresh: now },
          $inc: { remainingVotes: votesToAdd }
        },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        remainingVotes: updatedUser?.remainingVotes || 0,
        lastVoteRefresh: updatedUser?.lastVoteRefresh || now,
        votesAdded: votesToAdd
      });
    }

    return NextResponse.json({
      success: false,
      message: "Le délai de 3 heures n'est pas encore écoulé"
    });

  } catch (error) {
    console.error("Erreur lors du rafraîchissement des votes:", error);
    return NextResponse.json(
      { error: "Erreur lors du rafraîchissement des votes" },
      { status: 500 }
    );
  }
}
