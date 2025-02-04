import { NextResponse } from "next/server";
import { sendNewsletterTest } from "@/lib/nodemailer";

export async function POST() {
  try {
    await sendNewsletterTest();
    return NextResponse.json({ message: "Newsletter de test envoyée" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 }
    );
  }
}
