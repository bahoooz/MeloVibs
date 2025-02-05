import { NextResponse } from "next/server";
import { updateAllTracks } from "@/lib/updateAllTracks";
import { updateAllArtists } from "@/lib/updateAllArtists";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      console.log("Authorization header reçu :", request.headers.get("authorization"));
      console.log("CRON_SECRET_KEY :", process.env.CRON_SECRET_KEY);
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    console.log("Début de la mise à jour automatique...");
    
    await Promise.all([
      updateAllTracks(),
      updateAllArtists()
    ]);

    console.log("Mise à jour automatique terminée avec succès");
    
    return NextResponse.json({ 
      success: true, 
      message: "Mise à jour automatique effectuée" 
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour automatique:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Erreur lors de la mise à jour automatique" 
    }, { status: 500 });
  }
}
