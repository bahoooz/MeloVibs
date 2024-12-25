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

// Fonction pour récupérer les pistes de la playlist "Rap Français"
export async function getListRapFrTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/playlists/298rv22FYrjBdEuZBB0upz?si=d0786ac0855b42f2/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des pistes de la playlist Rap Français"
    );
  }

  const listTracks = await res.json();
  // console.log('Données des pistes Spotify de la playlist Rap Français :', listTracks.tracks.items);

  const tracksItems = listTracks.tracks.items;

  try {
    await connectDb();
    console.log("Connexion à la base de données réussie");

    for (const item of tracksItems) {
      const track = item.track;

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
        genres: ["rap-fr"],
      };

      // console.log('Mise à jour du track:', trackData);

      await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
        upsert: true,
        new: true,
      }).catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du track de la playlist Rap Français :",
          error
        );
      });
    }

    // console.log("Pistes sauvegardées avec succès dans MongoDB");

    return tracksItems;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des pistes de la playlist Rap Français:",
      error
    );
    throw new Error(
      "Échec de la sauvegarde des pistes dans la base de données"
    );
  }
}

export async function getListPopTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/playlists/1WoRmb6giude5vQ8kIYhQy?si=42215c81d12e4c68/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des pistes de la playlist Pop"
    );
  }

  const listTracks = await res.json();
  console.log(
    "Données des pistes Spotify de la playlist Pop :",
    listTracks.tracks.items
  );

  const tracksItems = listTracks.tracks.items;

  try {
    await connectDb();
    console.log("Connexion à la base de données réussie");

    for (const item of tracksItems) {
      const track = item.track;

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
        genres: ["pop"],
      };

      // console.log('Mise à jour du track:', trackData);

      await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
        upsert: true,
        new: true,
      }).catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du track de la playlist Pop :",
          error
        );
      });
    }

    console.log("Pistes sauvegardées avec succès dans MongoDB");

    return tracksItems;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des pistes de la playlist Pop :",
      error
    );
    throw new Error(
      "Échec de la sauvegarde des pistes dans la base de données"
    );
  }
}

export async function getListJazzTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/playlists/164ve0IOjCP6tkcJzVLD7n?si=1fbfa5e1fdbd43ec/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des pistes de la playlist Jazz"
    );
  }

  const listTracks = await res.json();
  console.log(
    "Données des pistes Spotify de la playlist Jazz :",
    listTracks.tracks.items
  );

  const tracksItems = listTracks.tracks.items;

  try {
    await connectDb();
    console.log("Connexion à la base de données réussie");

    for (const item of tracksItems) {
      const track = item.track;

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
        genres: ["jazz"],
      };

      // console.log('Mise à jour du track:', trackData);

      await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
        upsert: true,
        new: true,
      }).catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du track de la playlist Jazz :",
          error
        );
      });
    }
    console.log("Pistes sauvegardées avec succès dans MongoDB");

    return tracksItems;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des pistes de la playlist Jazz :",
      error
    );
    throw new Error(
      "Échec de la sauvegarde des pistes dans la base de données"
    );
  }
}

export async function getListRnBTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/playlists/3SsPWyQnAh1ccWEXZPYaCY?si=c8c7eb07f4e04c4b/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des pistes de la playlist R&B"
    );
  }

  const listTracks = await res.json();
  console.log(
    "Données des pistes Spotify de la playlist R&B :",
    listTracks.tracks.items
  );

  const tracksItems = listTracks.tracks.items;

  try {
    await connectDb();
    console.log("Connexion à la base de données réussie");

    for (const item of tracksItems) {
      const track = item.track;

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
        genres: ["r&b"],
      };

      // console.log('Mise à jour du track:', trackData);

      await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
        upsert: true,
        new: true,
      }).catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du track de la playlist R&B :",
          error
        );
      });
    }
    console.log("Pistes sauvegardées avec succès dans MongoDB");

    return tracksItems;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des pistes de la playlist R&B :",
      error
    );
    throw new Error(
      "Échec de la sauvegarde des pistes dans la base de données"
    );
  }
}

export async function getListAfroBeatsTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/playlists/4ykrONBhOgPr4sMhAVCoPx?si=0724b0196ae644b9/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des pistes de la playlist Afro Beats"
    );
  }

  const listTracks = await res.json();
  console.log(
    "Données des pistes Spotify de la playlist Afro Beats :",
    listTracks.tracks.items
  );

  const tracksItems = listTracks.tracks.items;

  try {
    await connectDb();
    console.log("Connexion à la base de données réussie");

    for (const item of tracksItems) {
      const track = item.track;

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
        genres: ["afro-beats"],
      };

      console.log("Mise à jour du track:", trackData);

      await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
        upsert: true,
        new: true,
      }).catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du track de la playlist Afro Beats :",
          error
        );
      });
    }
    console.log("Pistes sauvegardées avec succès dans MongoDB");

    return tracksItems;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde des pistes de la playlist Afro Beats :",
      error
    );
    throw new Error(
      "Échec de la sauvegarde des pistes dans la base de données"
    );
  }
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
