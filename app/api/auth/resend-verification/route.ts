import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import { sendVerificationEmail } from "@/lib/nodemailer";
import crypto from 'crypto';

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
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        if (user.isEmailVerified) {
            return NextResponse.json(
                { error: "Email déjà vérifié" },
                { status: 400 }
            );
        }

        // Générer un nouveau token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;
        await user.save();

        // Renvoyer l'email
        await sendVerificationEmail(email, verificationToken);

        return NextResponse.json(
            { message: "Email de vérification renvoyé avec succès" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors du renvoi de l'email:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        );
    }
} 