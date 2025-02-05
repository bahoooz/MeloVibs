import { NextResponse } from "next/server";
import { updateAllTracks } from "@/lib/updateAllTracks";
import { updateAllArtists } from "@/lib/updateAllArtists";

export async function GET(request: Request) {
  try {
    // Vérifier que la requête vient bien de Vercel Cron
    if (request.headers.get('x-vercel-cron') !== 'true') {
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
