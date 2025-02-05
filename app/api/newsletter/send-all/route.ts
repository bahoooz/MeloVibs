import { NextResponse } from "next/server";
import { sendNewsletterToAllUsers } from "@/lib/nodemailer";

export async function POST() {
  try {
    const result = await sendNewsletterToAllUsers();
    return NextResponse.json({ 
      message: "Newsletter envoyée", 
      ...result 
    }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi" },
      { status: 500 }
    );
  }
}