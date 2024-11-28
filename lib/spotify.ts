import connectDb from "./mongodb";
import Track from "@/models/track";

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

export async function getListTracks() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/playlists/298rv22FYrjBdEuZBB0upz?si=d0786ac0855b42f2/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error("Échec de la récupération des données des pistes");
  }

  const listTracks = await response.json();

  try {
    await connectDb();

    for (const item of listTracks.tracks.items) {
      const track = item.track;
      
      const trackData = {
        spotifyId: track.id,
        name: track.name,
        previewUrl: track.preview_url,
        artists: track.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: {
          id: track.album.id,
          name: track.album.name,
          images: track.album.images,
        },
        popularity: track.popularity,
      };

      await Track.findOneAndUpdate(
        { spotifyId: track.id },
        trackData,
        { upsert: true, new: true }
      );
    }

    console.log("Pistes sauvegardées avec succès dans MongoDB");
    
    return listTracks;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des pistes:", error);
    throw new Error("Échec de la sauvegarde des pistes dans la base de données");
  }
}
