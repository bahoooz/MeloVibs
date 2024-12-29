export async function updateAllArtists() {
    const genres = [
      'rap-fr', 'pop', 'jazz', 'r&b', 'afro-beats',
      'rap-us', 'latines', 'rock', 'electro', 'kpop'
    ];
  
    try {
      const updatePromises = genres.map(async (genre) => {
        const response = await fetch(`/api/spotify/get-list-artists/${genre}`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des artistes Spotify ${genre}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Données des artistes Spotify ${genre}:`, data);
        return data;
      });
  
      await Promise.all(updatePromises);
      console.log("Mise à jour de toutes les artistes terminée");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des artistes:", error);
      throw error;
    }
  }
  