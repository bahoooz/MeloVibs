import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.redirect(new URL('/newsletter/erreur?message=Lien invalide', request.url));
    }

    await connectDb();
    
    const user = await User.findOne({
      email: email,
      newsletterUnsubscribeToken: token
    });

    if (!user) {
      return NextResponse.redirect(new URL('/newsletter/erreur?message=Lien invalide ou expiré', request.url));
    }

    // Mettre à jour les préférences de l'utilisateur
    await User.findByIdAndUpdate(user._id, {
      newsletterUnsubscribeToken: null,
      isSubscribedToNewsletter: false
    });

    return NextResponse.redirect(new URL('/newsletter/success', request.url));
  } catch (error) {
    console.error("Erreur lors du désabonnement:", error);
    return NextResponse.redirect(new URL('/newsletter/erreur?message=Une erreur est survenue', request.url));
  }
}