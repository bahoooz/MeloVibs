export async function updateAllArtists() {
  const genres = [
    'rap-fr', 'pop', 'jazz', 'r&b', 'afro-beats',
    'rap-us', 'latines', 'rock', 'electro', 'kpop'
  ];

  const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_APP_URL 
    : '';

  try {
    for (const genre of genres) {
      try {
        const response = await fetch(`${baseUrl}/api/spotify/get-list-artists/${genre}`);
        if (!response.ok) {
          console.error(`Erreur pour ${genre}: ${response.statusText}`);
          continue;
        }
        const data = await response.json();
        console.log(`Données des artistes Spotify ${genre} mises à jour :`, data);
      } catch (error) {
        console.error(`Erreur pour ${genre}:`, error);
        continue;
      }
    }
    console.log("Mise à jour de tous les artistes terminée");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des artistes:", error);
    throw error;
  }
}
  