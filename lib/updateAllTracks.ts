export async function updateAllTracks() {
  const genres = [
    'rap-fr', 'pop', 'jazz', 'r&b', 'afro-beats',
    'rap-us', 'latines', 'rock', 'electro', 'kpop'
  ];

  const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_APP_URL 
    : '';

  try {
    // Démarrer la mise à jour progressive des tracks existants
    let startIndex = 0;
    let done = false;

    while (!done && startIndex < 5000) { // Augmenter la limite pour plus de tracks
      const response = await fetch(`${baseUrl}/api/tracks/update-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startIndex, batchSize: 50 }), // Augmenter la taille du batch
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du batch');
      }

      const result = await response.json();
      if (result.done) {
        done = true;
      } else {
        startIndex = result.nextIndex;
      }
    }

    // Continuer avec la mise à jour des playlists
    for (const genre of genres) {
      try {
        const response = await fetch(`${baseUrl}/api/spotify/get-list-tracks/${genre}`);
        if (!response.ok) {
          console.error(`Erreur pour ${genre}: ${response.statusText}`);
          continue;
        }
        const data = await response.json();
        console.log(`Données des pistes Spotify ${genre} mises à jour :`, data);
      } catch (error) {
        console.error(`Erreur pour ${genre}:`, error);
        continue;
      }
    }
    
    console.log("Mise à jour de toutes les pistes terminée");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des pistes:", error);
    throw error;
  }
}
