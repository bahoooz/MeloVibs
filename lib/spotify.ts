import Artist from "@/models/artist";
import connectDb from "./mongodb";
import Track from "@/models/track";

interface Artist {
  id: string;
  name: string;
}

interface SpotifyArtist {
  id: string;
  name: string;
  followers: {
    total: number;
  };
  genres: string[];
  popularity: number;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  external_urls: {
    spotify: string;
  };
}

export async function getAccessToken(): Promise<string> {
  const client_id = process.env.SPOTIFY_CLIENT_ID as string;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get access token");
  return data.access_token;
}

// Fonction générique pour récupérer les tracks d'une playlist
async function getPlaylistTracks(playlistIds: string[], genre: string) {
  const token = await getAccessToken();

  try {
    const playlistsData = await Promise.all(
      playlistIds.map(id => 
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Échec de la récupération de la playlist ${id}`);
          }
          return res.json();
        })
      )
    );

    const allTracksItems = playlistsData
      .flatMap(playlist => playlist.tracks.items)
      .filter(item => item && item.track);

    await connectDb();
    console.log(`Connexion à la base de données réussie pour ${genre}`);
    console.log(`Nombre de tracks ${genre} trouvés:`, allTracksItems.length);

    for (const item of allTracksItems) {
      const track = item.track;
      
      try {
        const trackData = {
          spotifyId: track.id,
          name: track.name,
          previewUrl: track.preview_url,
          artists: track.artists.map((artist: Artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          album: {
            id: track.album.id,
            name: track.album.name,
            images: track.album.images,
            share_link: track.album.external_urls.spotify,
            release_date: track.album.release_date,
          },
          popularity: track.popularity,
          duration_ms: track.duration_ms,
          genres: [genre],
        };

        await Track.findOneAndUpdate(
          { spotifyId: track.id }, 
          trackData, 
          { upsert: true, new: true }
        );
      } catch (error) {
        console.error(`Erreur lors du traitement du track ${genre}:`, track?.name, error);
        continue;
      }
    }

    return allTracksItems;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde des pistes de la playlist ${genre}:`, error);
    throw new Error(`Échec de la sauvegarde des pistes ${genre} dans la base de données`);
  }
}

// Fonctions spécifiques pour chaque genre
export async function getListRapFrTracks() {
  const playlistIds = [
    "298rv22FYrjBdEuZBB0upz",
    "1FwqVCZqm8USJuMJqhKq1J",
    "7e57bVZpqAFyYJHh5eWo7b",
    "1YrEsksPM1kaUuhKpaW1ip",
    "2zAmwkFHAxu3MQtvFezJly"
  ];
  return getPlaylistTracks(playlistIds, "rap-fr");
}

export async function getListPopTracks() {
  const playlistIds = [
    "1WoRmb6giude5vQ8kIYhQy",
    "3KdNofOL1dMlRM53PWH9AX"
  ];
  return getPlaylistTracks(playlistIds, "pop");
}

export async function getListJazzTracks() {
  const playlistIds = [
    "164ve0IOjCP6tkcJzVLD7n",
    "7piVTqqLGq7ywSkZp5lyG4"
  ];
  return getPlaylistTracks(playlistIds, "jazz");
}

export async function getListRnBTracks() {
  const playlistIds = [
    "4TyIK0EMh6L4Dn3N3zp5pf",
    "2loX3fKYzjJ2o5aSHjqhlR"
  ];
  return getPlaylistTracks(playlistIds, "r&b");
}

export async function getListAfroBeatsTracks() {
  const playlistIds = [
    "4ykrONBhOgPr4sMhAVCoPx",
    "5myeBzohhCVewaK2Thqmo5"
  ];
  return getPlaylistTracks(playlistIds, "afro-beats");
}

// ///////////////////////////

export async function getListRapUsTracks() {
  const playlistIds = [
    "5fAhM64rOJprFIQEnmWQd1",
    "1awYlVqR3LpIS0fkUW3kbw"
  ];
  return getPlaylistTracks(playlistIds, "rap-us");
}

export async function getListLatinesTracks() {
  const playlistIds = [
    "5oYb3EYc6MNGw0YuhlSDMN",
    "6R2N9jmZsAaiS54DufhFby"
  ];
  return getPlaylistTracks(playlistIds, "latines");
}

export async function getListRockTracks() {
  const playlistIds = [
    "1FIN7khU6KZkops8XJvm7N",
    "7EKWxCA0Ip1y3mDNycr4Dk"
  ];
  return getPlaylistTracks(playlistIds, "rock");
}

export async function getListElectroTracks() {
  const playlistIds = [
    "33PyRULhtc4SRrUE1wbbmp",
    "1R2TXxbdL7YJxQvqLn4mXV"
  ];
  return getPlaylistTracks(playlistIds, "electro");
}

export async function getListKpopTracks() {
  const playlistIds = [
    "2EoheVFjqIxgJMb8VnDRtZ",
    "0VjrAiRMSDDyBgJB8gJJcc"
  ];
  return getPlaylistTracks(playlistIds, "kpop");
}

// Fonction pour récupérer des artistes Rap Français

export async function getArtistsRapFr() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/artists?ids=3IW7ScrzXmPvZhB27hmfgy,6Te49r3A6f5BiIgBRxH7FH,5gqmbbfjcikQBzPB5Hv13I,3YBJLs7RqR0aPGBgU27nDh,0GOx72r5AAEKRGQFn3xqXK,7CUFPNi1TU8RowpnFRSsZV,2kXKa3aAFngGz2P4GjG5w2,3DCWeG2J1fZeu0Oe6i5Q6m,1q7T9rFQ2a2ukA1PU51fo3,6L34dW6SKMSDaGIfYDU19j,58wXmynHaAWI5hwlPZP3qL,4LXBc13z5EWsc5N32bLxfH,1ntQKIMIgESKpKoNXVBvQg,4FpJcNgOvIpSBeJgRg3OfN,1ntQKIMIgESKpKoNXVBvQg,6QS84S3i4gwdEKqWoTtDLd,2UwqpfQtNuhBwviIC0f2ie,5gs4Sm2WQUkcGeikMcVHbh,76Pl0epAMXVXJspaSuz8im,54kCbQZaZWHnwwj9VP2hn4",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Échec de la récupération des données des artistes Rap Français");
  }

  const listArtists = await res.json();
  const artistsItems = listArtists.artists;

  try {
    await connectDb();

    const artistsPromises = artistsItems.map(async (artist: SpotifyArtist) => {
      // Récupérer toutes les pistes de l'artiste
      const tracks = await Track.find({
        "artists.id": artist.id
      });

      // Calculer le total des votes pour cet artiste
      const totalVotes = tracks.reduce((sum, track) => sum + (track.votes || 0), 0);

      const artistData = {
        spotifyId: artist.id,
        name: artist.name,
        followers: artist.followers.total,
        genres: artist.genres,
        popularity: artist.popularity,
        votes: totalVotes,
        images: artist.images,
        share_link: artist.external_urls.spotify,
      };

      return Artist.findOneAndUpdate(
        { spotifyId: artist.id },
        artistData,
        { upsert: true, new: true }
      );
    });

    await Promise.all(artistsPromises);
    return artistsItems;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des artistes:", error);
    throw error; // Propager l'erreur réelle plutôt qu'une nouvelle erreur générique
  }
}
