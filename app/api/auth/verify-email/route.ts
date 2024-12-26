import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/verification-echec', request.url));
    }

    await connectDb();
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.redirect(new URL('/verification-echec', request.url));
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.redirect(new URL('/verification-reussie', request.url));
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    return NextResponse.redirect(new URL('/verification-echec', request.url));
  }
} 