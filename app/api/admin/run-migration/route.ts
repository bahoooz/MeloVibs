import { NextResponse } from "next/server";
import { addNewsletterFields } from "@/lib/migrations/add-newsletter-fields";

export async function POST() {
  try {
    const result = await addNewsletterFields();
    return NextResponse.json({ 
      message: "Migration terminée avec succès",
      result 
    }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la migration:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la migration" },
      { status: 500 }
    );
  }
}