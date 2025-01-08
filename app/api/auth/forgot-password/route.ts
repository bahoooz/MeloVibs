import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import crypto from 'crypto';
import { sendPasswordResetEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    await connectDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Aucun compte associé à cet email" },
        { status: 404 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: "Email de réinitialisation envoyé" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue : " + error },
      { status: 500 }
    );
  }
}
