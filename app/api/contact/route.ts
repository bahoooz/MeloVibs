import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, object, message, userName } = await request.json();

    if (!email || !object || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await sendContactEmail(email, object, message, userName);

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
