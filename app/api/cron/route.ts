import { NextResponse } from "next/server";
import { updateAllTracks } from "@/lib/updateAllTracks";
import { updateAllArtists } from "@/lib/updateAllArtists";

export async function GET(request: Request) {
  try {
    // Vérifier tous les en-têtes possibles de Vercel Cron
    const isVercelCron = 
      request.headers.get('x-vercel-cron') === 'true' || 
      request.headers.get('User-Agent')?.includes('vercel-cron');

    if (!isVercelCron) {
      console.log("En-têtes reçus:", Object.fromEntries(request.headers.entries()));
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
