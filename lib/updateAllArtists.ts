export async function updateAllArtists() {
  const genres = [
    'rap-fr', 'pop', 'jazz', 'r&b', 'afro-beats',
    'rap-us', 'latines', 'rock', 'electro', 'kpop'
  ];

  try {
    for (const genre of genres) {
      try {
        const response = await fetch(`/api/spotify/get-list-artists/${genre}`);
        if (!response.ok) {
          console.error(`Erreur pour ${genre}: ${response.statusText}`);
          continue; // Continue avec le prochain genre même en cas d'erreur
        }
        const data = await response.json();
        console.log(`Données des artistes Spotify ${genre} mises à jour :`, data);
      } catch (error) {
        console.error(`Erreur pour ${genre}:`, error);
        continue; // Continue avec le prochain genre même en cas d'erreur
      }
    }
    console.log("Mise à jour de tous les artistes terminée");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des artistes:", error);
    throw error;
  }
}
  