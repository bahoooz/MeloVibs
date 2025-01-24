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
      playlistIds.map((id) =>
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Échec de la récupération de la playlist ${id}`);
          }
          return res.json();
        })
      )
    );

    const allTracksItems = playlistsData
      .flatMap((playlist) => playlist.tracks.items)
      .filter((item) => item && item.track);

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

        await Track.findOneAndUpdate({ spotifyId: track.id }, trackData, {
          upsert: true,
          new: true,
        });
      } catch (error) {
        console.error(
          `Erreur lors du traitement du track ${genre}:`,
          track?.name,
          error
        );
        continue;
      }
    }

    return allTracksItems;
  } catch (error) {
    console.error(
      `Erreur lors de la sauvegarde des pistes de la playlist ${genre}:`,
      error
    );
    throw new Error(
      `Échec de la sauvegarde des pistes ${genre} dans la base de données`
    );
  }
}

// Fonctions spécifiques pour chaque genre
export async function getListRapFrTracks() {
  const playlistIds = [
    "298rv22FYrjBdEuZBB0upz",
    "1FwqVCZqm8USJuMJqhKq1J",
    "7e57bVZpqAFyYJHh5eWo7b",
    "4L1diBH1WJ2J9QxCGy7EMd"
  ];
  return getPlaylistTracks(playlistIds, "rap-fr");
}

export async function getListPopTracks() {
  const playlistIds = ["1WoRmb6giude5vQ8kIYhQy", "3KdNofOL1dMlRM53PWH9AX"];
  return getPlaylistTracks(playlistIds, "pop");
}

export async function getListJazzTracks() {
  const playlistIds = ["164ve0IOjCP6tkcJzVLD7n", "7piVTqqLGq7ywSkZp5lyG4"];
  return getPlaylistTracks(playlistIds, "jazz");
}

export async function getListRnBTracks() {
  const playlistIds = ["4TyIK0EMh6L4Dn3N3zp5pf", "2loX3fKYzjJ2o5aSHjqhlR"];
  return getPlaylistTracks(playlistIds, "r&b");
}

export async function getListAfroBeatsTracks() {
  const playlistIds = ["4ykrONBhOgPr4sMhAVCoPx", "5myeBzohhCVewaK2Thqmo5"];
  return getPlaylistTracks(playlistIds, "afro-beats");
}

// ///////////////////////////

export async function getListRapUsTracks() {
  const playlistIds = ["5fAhM64rOJprFIQEnmWQd1", "1awYlVqR3LpIS0fkUW3kbw"];
  return getPlaylistTracks(playlistIds, "rap-us");
}

export async function getListLatinesTracks() {
  const playlistIds = ["5oYb3EYc6MNGw0YuhlSDMN", "6R2N9jmZsAaiS54DufhFby"];
  return getPlaylistTracks(playlistIds, "latines");
}

export async function getListRockTracks() {
  const playlistIds = ["1FIN7khU6KZkops8XJvm7N", "7EKWxCA0Ip1y3mDNycr4Dk"];
  return getPlaylistTracks(playlistIds, "rock");
}

export async function getListElectroTracks() {
  const playlistIds = ["33PyRULhtc4SRrUE1wbbmp", "1R2TXxbdL7YJxQvqLn4mXV"];
  return getPlaylistTracks(playlistIds, "electro");
}

export async function getListKpopTracks() {
  const playlistIds = ["2EoheVFjqIxgJMb8VnDRtZ", "0VjrAiRMSDDyBgJB8gJJcc"];
  return getPlaylistTracks(playlistIds, "kpop");
}

// Fonction pour récupérer des artistes Rap Français

export async function getArtistsRapFr() {
  const token = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/artists?ids=", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      "Échec de la récupération des données des artistes Rap Français"
    );
  }

  const listArtists = await res.json();
  const artistsItems = listArtists.artists;

  try {
    await connectDb();

    const artistsPromises = artistsItems.map(async (artist: SpotifyArtist) => {
      // Récupérer toutes les pistes de l'artiste
      const tracks = await Track.find({
        "artists.id": artist.id,
      });

      // Calculer le total des votes pour cet artiste
      const totalVotes = tracks.reduce(
        (sum, track) => sum + (track.votes || 0),
        0
      );

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

      return Artist.findOneAndUpdate({ spotifyId: artist.id }, artistData, {
        upsert: true,
        new: true,
      });
    });

    await Promise.all(artistsPromises);
    return artistsItems;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des artistes:", error);
    throw error; // Propager l'erreur réelle plutôt qu'une nouvelle erreur générique
  }
}

async function getListArtists(artistIds: string[], genre: string) {
  const token = await getAccessToken();

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists?ids=${artistIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Échec de la récupération des artistes ${genre}`);
    }

    const listArtists = await res.json();
    const artistsItems = listArtists.artists;

    await connectDb();
    console.log(
      `Connexion à la base de données réussie pour les artistes ${genre}`
    );
    console.log(`Nombre d'artistes ${genre} trouvés:`, artistsItems.length);

    const artistsPromises = artistsItems.map(async (artist: SpotifyArtist) => {
      // Récupérer toutes les pistes de l'artiste
      const tracks = await Track.find({
        "artists.id": artist.id,
      });

      // Calculer le total des votes pour cet artiste
      const totalVotes = tracks.reduce(
        (sum, track) => sum + (track.votes || 0),
        0
      );

      const artistData = {
        spotifyId: artist.id,
        name: artist.name,
        followers: artist.followers.total,
        genres: [...artist.genres, genre], // Ajoute le genre spécifié aux genres existants
        popularity: artist.popularity,
        votes: totalVotes,
        images: artist.images,
        share_link: artist.external_urls.spotify,
      };

      return Artist.findOneAndUpdate({ spotifyId: artist.id }, artistData, {
        upsert: true,
        new: true,
      });
    });

    await Promise.all(artistsPromises);
    return artistsItems;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde des artistes ${genre}:`, error);
    throw error;
  }
}

export async function getListRapFrArtists() {
  const playlistIds = [
    "3IW7ScrzXmPvZhB27hmfgy",
    "6Te49r3A6f5BiIgBRxH7FH",
    "0GOx72r5AAEKRGQFn3xqXK",
    "5gqmbbfjcikQBzPB5Hv13I",
    "2UwqpfQtNuhBwviIC0f2ie",
    "2kXKa3aAFngGz2P4GjG5w2",
    "3YBJLs7RqR0aPGBgU27nDh",
    "7CUFPNi1TU8RowpnFRSsZV",
    "3DCWeG2J1fZeu0Oe6i5Q6m",
    "6L34dW6SKMSDaGIfYDU19j",
    "58wXmynHaAWI5hwlPZP3qL",
    "5gs4Sm2WQUkcGeikMcVHbh",
    "4LXBc13z5EWsc5N32bLxfH",
    "1q7T9rFQ2a2ukA1PU51fo3",
    "4FpJcNgOvIpSBeJgRg3OfN",
    "1ntQKIMIgESKpKoNXVBvQg",
    "54kCbQZaZWHnwwj9VP2hn4",
    "6QS84S3i4gwdEKqWoTtDLd",
    "76Pl0epAMXVXJspaSuz8im",
    "3YwqjMyrRfuixi2pbgTGCE",
    "3CnCGFxXbOA8bAK54jR8js",
    "6W5uA6CNMf3hd2j4a2XWCx",
    "0GgY7hjMoGDsX8ZDe2mwds",
    "2eh8cEKZk4VeruUrGq748D",
    "25yJrwrn5I0EUdQEiTtNSO",
    "6ytOHdKh4xt4YvF7tz8Zcv",
    "3J7r4VsNmuWixU0nXvyPd8",
    "2ptKt4yP4mYRZmvi09JYyi",
    "63MCBZRiUdnqRsAOJwijiB",
    "0LnhY2fzptb0QEs5Q5gM7S",
    "66Ok6bgC570sHkw08N20pZ",
    "2ubn2zwyYaLdHOCKnTouU2",
    "5Y5EJ20jDQkkB213zwuDXR",
    "05hirnMeVIzCrcUxbrysZU",
    "7rTPCNINGzMp3Hc8Xqht5Z",
    "1kwzW1IszUiq4Gs9BFesvW",
    "0LKAV3zJ8a8AIGnyc5OvfB",
    "3b5bg1k6N9u31OtzSfK2dP",
    "5olcgTzelGdyP1rHRLyWgs",
    "6dbdXbyAWk2qx8Qttw0knR",
    "0QcZD8V0Ug1KINWBSyG0dB",
    "1WDkNp8Duv9QhO246S4dDa",
    "4vtz0m60CCrcsQmqDunDIR",
    "1wAtSe79kItIb9nf5EhI2Q",
    "4eYnorQRhVHT2KBl2UyHHd",
    "6qFt3TjvxMt77YGsktWG8Z",
    "2kIs76sEGiulKeqetZq6ua",
    "3MNnSV5hDd2UzZzgqD8xlU",
    "6Mm2g25BTeJ6BICPFWGkPg",
  ];
  return getListArtists(playlistIds, "rap-fr");
}

export async function getListPopArtists() {
  const playlistIds = [
    "6qqNVTkY8uBg9cP3Jd7DAH",
    "1McMsnEElThX1knmY4oliG",
    "6M2wZ9GZgrQXHCFfjv46we",
    "2kRfqPViCqYdSGhYSM9R0Q",
    "6KImCVD70vtIoJWnq6nGn3",
    "66CXWjxzNUsdJxJ2JdwvnR",
    "1Xyo4u8uXC1ZmMpatF05PJ",
    "06HL4z0CvFAxyc27GXpf02",
    "0C8ZW7ezQVs4URX5aX7Kqx",
    "5cj0lLjcoR7YOSnhnX0Po5",
    "1uNFoZAHBGtllmzznpCI3s",
    "6eUKZXaKkcviH0Ku9w2n3V",
    "5YGY8feqx7naU7z4HrwZM6",
    "6VuMaDnrHyPL1p4EHjYLi7",
    "7n2wHs1TKAczGzO7Dd2rGr",
    "4nDoRrQiYLoBzwC5BhVJzF",
    "7tYKF4w9nC0nq9CsPZTHyP",
    "6LuN9FCkKOj5PcnpouEgny",
    "45dkTj5sMRSjrmBSBeiHym",
    "1Xylc3o4UrD53lo9CvFvVg",
    "4npEfmQ6YuiwW1GpUmaq3F",
    "1mcTU81TzQhprhouKaTkpq",
    "3eVa5w3URK5duf6eyVDbu9",
    "6UZ0ba50XreR4TM8u322gs",
    "3Nrfpe0tUJi4K4DXYWgMUX",
    "6HaGTQPmzraVmaVxvz6EUc",
    "41MozSoPIsD1dJM0CLPjZF",
    "4Uc8Dsxct0oMqx0P6i60ea",
    "7FNnA9vBm6EKceENgCGRMb",
    "4obzFoKoKRHIphyHzJ35G3",
    "7jVv8c5Fj3E9VhNjxT4snq",
    "2wY79sveU1sp5g7SokKOiI",
    "3WGpXCj9YhhfX11TToZcXP",
    "1zNqDE7qDGCsyzJwohVaoX",
    "26VFTg2z8YR0cCuwLzESi2",
    "181bsRPaVXVlUKXrxwZfHK",
    "5CCwRZC6euC8Odo6y9X8jr",
    "74KM79TiuVKeVCqs8QtB0B",
    "3GxKJzJK4LpsYGXQrw77wz",
    "1Hsdzj7Dlq2I7tHP7501T4",
    "73KwqWuob0R53I14Vs56p9",
    "2cWZOOzeOm4WmBJRnD5R7I",
    "3J0BpFVUc9LeOIVeN5uNhU",
    "57LYzLEk2LcFghVwuWbcuS",
    "5IH6FPUwQTxPSXurCrcIov",
    "5qa31A9HySw3T7MKWI9bGg",
    "4GNC7GD6oZMSxPGyXy4MNB",
    "7gOdHgIoIKoe4i9Tta6qdD",
    "2VSHKHBTiXWplO8lxcnUC9",
  ];
  return getListArtists(playlistIds, "pop");
}

export async function getListJazzArtists() {
  const playlistIds = [
    "6HQYnRM4OzToCYPpVBInuU",
    "5bepW5vcdRzheNc0F8lHJ5",
    "7ENzCHnmJUr20nUjoZ0zZ1",
    "5cM1PvItlR21WUyBnsdMcn",
    "06nevPmNVfWUXyZkccahL8",
    "0QWrMNukfcVOmgEU0FEDyD",
    "2q37Nw8NND2z1T1KU5XVfn",
    "6ywMpa6AmGJpV5Sbyy58Js",
    "0Z5FMozvx15nUSUA6a9kkU",
    "3pvRbmrqOyFxB2Eext4Dki",
    "6O5k8LLRfDK8v9jj1GazAQ",
    "4frXpPxQQZwbCu3eTGnZEw",
    "21SOnTj5ECwVXeBUTRcP3s",
    "2vI9KFm0fwSfPrpEgOeIbq",
    "7MNEVabc4cs19CbzAFZmXz",
    "2i1CPudyCUjL50Wqjv8AMI",
    "19f2JXwlRU26376TCKmp6L",
    "27DeRe5LjIt9ZPXUjF90h6",
    "4ai53dgSBGhQwcFtGyY1bF",
    "22KzEvCtrTGf9l6k7zFcdv",
    "7DeuppKQdCVhuWrzzCBBpc",
    "5ACxPOI9gR3l0cyy2dvkHv",
    "0FcNSKwWZJb98ry9M2qEII",
    "3ItwOheFhoNjZRCpnY5O9I",
    "0D3h8NZqNp7BN97JwtV6eW",
    "1UhC1mCcd9SFXLibHhMX61",
    "1srvW9AP2k4GLhS3hlC3IN",
    "5LkbTSqXfMBjFSGi9LOGjq",
    "19j0iFmJ5A6CMT0MVZZU4O",
    "4l2MwXYwUDQKHcUXwCZjEz",
    "2RP4pPHTXlQpDnO9LvR7Yt",
    "5FnpXrrMdJVZCK54oHWqUa",
    "5mYw31MXiGnqTMliAcl7m8",
    "6PkSULcbxFKkxdgrmPGAvn",
    "2P1puQXmG48EVLBrHbum1J",
    "0NSO0g40h9CTj13hKPskeb",
    "4hdVPbHhsWAn2XTXVRJoxB",
    "3t58jfUhoMLYVO14XaUFLA",
    "0nXwIc4NAbu2K881ealRDu",
    "76Gi1qoWLrIerL5FcL0TZb",
    "0Sh2X6e3JerGnyEF0vDgbk",
    "7iUF39q93Xixo33E6IvNYm",
    "5FzOdzC3xUlGuFNNOQ4Xms",
    "0rS1Y2DkDJhLiaR0MyJyCg",
    "5ACouApJyhZpZ3Eu2DtrlM",
    "0SPbho0MYZZGtCWNLr4SPV",
    "6de0V6wLyRKp3I2LDMrXCr",
    "7jAeRfT8LYCxydM2Y1Egvn",
    "5GPxGRe2IglKP3ZiwwJbP4",
    "5wu05jGsVMAFHYMYHqCB9l",
  ];
  return getListArtists(playlistIds, "jazz");
}

export async function getListRnBArtists() {
  const playlistIds = [
    "1Xyo4u8uXC1ZmMpatF05PJ",
    "7tYKF4w9nC0nq9CsPZTHyP",
    "3Y7RZ31TRPVadSFVy1o8os",
    "57LYzLEk2LcFghVwuWbcuS",
    "6LuN9FCkKOj5PcnpouEgny",
    "2EMAnMvWE2eb56ToJVfCWs",
    "4fxd5Ee7UefO4CUXgwJ7IP",
    "20wkVLutqVOYrc0kxFs7rA",
    "2h93pZq0e7k5yf4dywlkpM",
    "0cGUm45nv7Z6M6qdXYQGTX",
    "7HkdQ0gt53LP4zmHsL0nap",
    "5ZS223C6JyBfXasXxrRqOk",
    "1vaQ6v3pOFxAIrFoPrAcom",
    "3tlXnStJ1fFhdScmQeLpuG",
    "5Vuvs6Py2JRU7WiFDVsI7J",
    "2cWZOOzeOm4WmBJRnD5R7I",
    "5cj0lLjcoR7YOSnhnX0Po5",
    "63XBtGSEZINSyXylZxEUbv",
    "360IAlyVv4PCEVjgyMZrxK",
    "2HPaUgqeutzr3jx5a9WyDV",
    "4IVAbR2w4JJNJDDRFP3E83",
    "7e1ICztHM2Sc4JNLxeMXYl",
    "7c0XG5cIJTrrAgEC3ULPiq",
    "0NIIxcxNHmOoyBx03SfTCD",
    "30DhU7BDmF4PH0JVhu8ZRg",
    "16rCzZOMQX7P8Kmn5YKexI",
    "5XMyhVhi5ZN2pi0Qwi1zXS",
    "7E2ioKxoxI2J94tUkIx6As",
    "1A9o3Ljt67pFZ89YtPPL5X",
    "6hfwwpXqZPRC9CsKI7qtv1",
    "3KedxarmBCyFBevnqQHy3P",
    "3qnGvpP8Yth1AqSBMqON5x",
    "4tMm1dU6Gn04VAZ9ClHcIZ",
    "7ibAWtDtmEfaVhc1FJ3Vl9",
    "7r2oyrNc0YjSC7hZL87V0Y",
    "756t7CBmWLNYsshVtS6P44",
    "3ycxRkcZ67ALN3GQJ57Vig",
    "2RP4pPHTXlQpDnO9LvR7Yt",
    "5RTLRtXjbXI2lSXc6jxlAz",
    "7HO5fOXE4gh3lzZn64tX2E",
    "0jUQSUOcM7lxVn5eVGTkzQ",
    "0tbeZu9lv8YEKSQ9tZSslu",
    "7g0SC4F149FUX5rKFuSpqL",
    "4ULO7IGI3M2bo0Ap7B9h8a",
    "3QTDHixorJelOLxoxcjqGx",
    "6TvjXbopXg71XRM9OZWqUc",
    "5qeWpRuIDDT5BBPojh8afd",
    "1W7FNibLa0O0b572tB2w7t",
  ];
  return getListArtists(playlistIds, "r&b");
}

export async function getListRapUSArtists() {
  const playlistIds = [
    "2YZyLoL8N0Wb9xBt1NhZWg",
    "6l3HvQ5sa6mXTsMTB19rO5",
    "3TVXtAsR1Inumwj472S9r4",
    "0Y5tJX1MQlPlqiwlOH1tJY",
    "1RyvyyTE3xzB2ZywiAwp0i",
    "4kYSro6naA4h99UJvo89HB",
    "181bsRPaVXVlUKXrxwZfHK",
    "5f7VJjfbwm532GiveGC0ZK",
    "2hlmm7s2ICUX0LVIhVFlZQ",
    "50co4Is1HCEo8bhOyUWKpn",
    "699OTQXzgjhIYAHMy9RyPD",
    "5cj0lLjcoR7YOSnhnX0Po5",
    "757aE44tKEUQEqRuT6GnEB",
    "6AgTAQt8XS6jRWi4sX7w49",
    "3hcs9uc56yIGFCSy9leWe7",
    "1URnnhqYAYcrqrcwql10ft",
    "4V8LLVI7PbaPR0K2TGSxFF",
    "13ubrt8QOOCPljQ2FL1Kca",
    "5dHt1vcEm9qb8fCyLcB3HL",
    "4O15NlyKLIASxsJ0PrXPfz",
    "4r63FhuTkUYltbVAg5TQnk",
    "4MCBfE4596Uoi2O4DtmEMz",
    "0eDvMgVFoNV3TpwtrVCoTj",
    "2LIk90788K0zvyj2JJVwkJ",
    "0hCNtLu0JehylgoiP8L4Gh",
    "5K4W6rqBFWDnAN6FQUkS6x",
    "7jVv8c5Fj3E9VhNjxT4snq",
    "4DdkRBBYG6Yk9Ka8tdJ9BW",
    "0VRj0yCOv2FXJNP47XQnx5",
    "3EW0kQ1skZiK1NHg3Spt9J",
    "37hAfseJWi0G3Scife12Il",
    "08PvCOlef4xdOr20jFSTPd",
    "2qoQgPAilErOKCwE2Y8wOG",
    "3LZZPxNDGDFVSIPqf4JuEf",
    "5Matrg5du62bXwer29cU5T",
    "67gqUXxHedeUGDTxwBzdjS",
    "0ABk515kENDyATUdpCKVfW",
    "6fxyWrfmjcbj5d12gXeiNV",
    "2P5sC9cVZDToPxyomzF1UH",
    "0huGjMyP507tBCARyzSkrv",
    "5SXuuuRpukkTvsLuUknva1",
    "68kEuyFKyqrdQQLLsmiatm",
    "6AUl0ykLLpvTktob97x9hO",
    "4Gso3d4CscCijv0lmajZWs",
    "0ErzCpIMyLcjPiwT4elrtZ",
    "3MdXrJWsbVzdn6fe5JYkSQ",
    "6AMd49uBDJfhf30Ak2QR5s",
    "14CHVeJGrR5xgUGQFV5BVM",
    "2rhFzFmezpnW82MNqEKVry",
    "3KNIG74xSTc3dj0TRy7pGX",
  ];
  return getListArtists(playlistIds, "rap-us");
}

export async function getListLatinesArtists() {
  const playlistIds = [
    "4q3ewBCX7sLwd24euuV69X",
    "1vyhD5VmyZ7KMfW5gqLgo5",
    "790FomKkXshlbRYZFtlgla",
    "7ltDVBr6mKbRvohxheJ9h1",
    "1r4hJ1h58CWwUQe3MxPuau",
    "1i8SpTcr7yvPOmcqrbnVXY",
    "7FNnA9vBm6EKceENgCGRMb",
    "1mcTU81TzQhprhouKaTkpq",
    "4obzFoKoKRHIphyHzJ35G3",
    "0EmeFodog0BfCgMzAIvKQp",
    "1GDbiv3spRmZ1XdM1jQbT7",
    "4VMYDCV2IEDYJArk749S6m",
    "07YUOmWljBTXwIseAUd9TW",
    "28gNT5KBp7IjEOQoevXf9N",
    "0tmwSHipWxN12fsoLcFU3B",
    "329e4yvIujISKGKz1BZZbO",
    "7iK8PXO48WeuP03g8YR51W",
    "4SsVbpTthjScTS7U2hmr1X",
    "2LRoIwlKmHjgvigdNGBHNo",
    "0eecdvMrqBftK0M1VKhaF4",
    "7vXDAI8JwjW531ouMGbfcp",
    "0vR2qb8m9WHeZ5ByCbimq2",
    "3MHaV05u0io8fQbZ2XPtlC",
    "5lwmRuXgjX8xIwlnauTZIP",
    "5M9Bb4adKAgrOFOhc05Y50",
    "1phfTBIocBW3UwqcYjaEN6",
    "5dbaLmK5SHLLg8Z4CcTJpX",
    "3vQ0GE3mI0dAaxIMYe5g7z",
    "2wkoKEfS6dXwThbyTnZWFU",
    "21451j1KhjAiaYKflxBjr1",
    "22P1OY4TRFRwhP0q29loQ8",
    "77ziqFxp5gaInVrF2lj4ht",
    "47MpMsUfWtgyIIBEFOr4FE",
    "0zO8yNnw5GQgutcIyXfGBY",
    "69UypehHabb68utzfjAVlV",
    "6k8mwkKJKKjBILo7ypBspl",
    "4bw2Am3p9ji3mYsXNXtQcd",
    "5C4PDR4LnhZTbVnKWXuDKD",
    "5AmJYBIvICxss43P05MkU8",
    "52qzWdNUp6ebjcNsvgZSiC",
    "1hcdI2N1023RvSwLzTtdsp",
    "0eHQ9o50hj6ZDNBt6Ys1sD",
    "37230BxxYs9ksS7OkZw3IU",
    "12vb80Km0Ew53ABfJOepVz",
    "7rOlQwf8OuFLFQp4aydjBt",
    "2urF8dgLVfDjunO0pcHUEe",
    "2UZIAOlrnyZmyzt1nuXr9y",
    "0GM7qgcRCORpGnfcN2tCiB",
    "2oQX8QiMXOyuqbcZEFsZfm",
    "6nVcHLIgY5pE2YCl8ubca1",
  ];
  return getListArtists(playlistIds, "latines");
}

export async function getListAfroBeatsArtists() {
  const playlistIds = [
    "3wcj11K77LjEY1PkEazffa",
    "3tVQdUvClmAT7URs9V3rsp",
    "0Y3agQaa6g2r0YmHPOO9rh",
    "46pWGuE3dSwY3bMMXGBvVS",
    "687cZJR45JO7jhk1LHIbgq",
    "1hNaHKp2Za5YdOAG0WnRbc",
    "7fKO99ryLDo8VocdtVvwZW",
    "5yOvAmpIR7hVxiS6Ls5DPO",
    "048LktY5zMnakWq7PTtFrz",
    "75VKfyoBlkmrJFDqo1o2VY",
    "1XavfPKBpNjkOfxHINlMHF",
    "3a1tBryiczPAZpgoZN9Rzg",
    "3ZpEKRjHaHANcpk10u6Ntq",
    "4Ns55iOSe1Im2WU2e1Eym0",
    "4TAoP0f9OuWZUesao43xUW",
    "1X6cBGnXpEpN7CmflLKmLV",
    "2hKQc001G7ggs3ZyxMdkGq",
    "4mSWNal2Ixxf1zrXSTLoep",
    "5DfaMudUwkoz6TAPYifqkJ",
    "3WTrdbZU99dgTtt3ZkyamT",
    "2s187JqHC9kipPLBLWXubl",
    "7kK5badbqOjd8WlT2XWMeM",
    "3DNCUaKdMZcMVJIS7yTskd",
    "2IK173RXLiCSQ8fhDlAb3s",
    "379IT6Szv0zgnw4xrdu4mu",
    "6IhG3Yxm3UW98jhyBvrIut",
    "5RCdjio4ASMQ8CFaSuAl6C",
    "0oKNR4ahj1CPnK2kQmbOfo",
    "4tIKaxUmpXzshok2yCnwdf",
    "0GGKrcPOlBkmBzQDf2Ogkl",
    "2ayt5jDUuTCpoTG7sHSvuq",
    "42q0rYXtR561ypg1Fcw1PI",
    "01DTVE3KmoPogPZaOvMqO8",
    "3ukrG1BmfEiuo0KDj8YTTS",
    "0a1SidMjD8D6EHvJph4n2H",
    "3bxZkzk0PLHcetO9o4oxXn",
    "5ywjxFhmhHGQBsK3DundNf",
    "0a8YNI8VHVPYKIPvCiJDxa",
    "1eCaedusgydlcn69blHOvL",
    "3cAisWS37sGCCtRgWfvrod",
    "5zqRdlPXeCIuxgaPimSKXj",
    "6BhoGzrwRr9eELLBJ55ldo",
    "4QSTyDpxsKmv3UfavVUImR",
    "523y9KSneKh6APd1hKxLuF",
    "2GJMSZ7M3D0KyyKRhYgWju",
    "08V2vgJBY6VLoUPWlznRKo",
    "1E5hfn5BduN2nnoZCJmUVG",
    "3zaDigUwjHvjOkSn0NDf9x",
    "1bNjWBFWsAAzZSR59lRdpR",
    "414pDI8Y502owCbg7U6Skf",
  ];
  return getListArtists(playlistIds, "afro-beats");
}

export async function getListRockArtists() {
  const playlistIds = [
    "53XhwfbYqKCa1cC15pYq2q",
    "7Ln80lUS6He07XvHI8qqHH",
    "3mIj9lX2MWuHmhNCA7LSCW",
    "0lAWpj5szCSwM4rUMHYmrr",
    "5INjqkS1o8h1imAzPqGZBb",
    "4NpFxQe2UvRCAjto3JqlSl",
    "26T3LtbuGT1Fu9m0eRq5X3",
    "2qk9voo8llSGYcZ6xrBzKx",
    "3YQKmKGau1PzlVlkL1iodx",
    "20JZFwl6HVl6yg8a4H3ZqK",
    "1moxjboGR7GNWYIMWsRjgG",
    "3gd8FJtBJtkRxdfbTu19U2",
    "74XFHRwlV6OrjEM0A2NCMF",
    "7jy3rLJdDQY21OgRLCZ9sD",
    "2FXC3k01G6Gw61bmprjgqS",
    "7EQ0qTo7fWT7DPxmxtSYEc",
    "0C0XlULifJtAgn6ZNCW2eu",
    "4kI8Ie27vjvonwaB2ePh8T",
    "7gP3bB2nilZXLfPHJhMdvc",
    "2S5hlvw4CMtMGswFtfdK15",
    "3btzEQD6sugImIHPMRgkwV",
    "1kDGbuxWknIKx4FlgWxiSp",
    "1Ffb6ejR6Fe5IamqA5oRUF",
    "0NIPkIjTV8mB795yEIiPYL",
    "2xaAOVImG2O6lURwqperlD",
    "1km0R7wy712AzLkA1WjKET",
    "3Ri4H12KFyu98LMjSoij5V",
    "77SW9BnxLY8rJ0RciFqkHh",
    "10exVja0key0uqUkk6LJRT",
    "6zlR5ttMfMNmwf2lecU9Cc",
    "6g0mn3tzAds6aVeUYRsryU",
    "1r1uxoy19fzMxunt3ONAkG",
    "4NZvixzsSefsNiIqXn0NDe",
    "2TwOrUcYnAlIiKmVQkkoSZ",
    "75mafsNqNE1WSEVxIKuY5C",
    "6eU0jV2eEZ8XTM7EmlguK6",
    "16oZKvXb6WkQlVAjwo2Wbg",
    "3kVUvbeRdcrqQ3oHk5hPdx",
    "4j56EQDQu5XnL7R3E9iFJT",
    "7jdFEYD2LTYjfwxOdlVjmc",
    "27M9shmwhIjRo7WntpT9Rp",
    "6s22t5Y3prQHyaHWUN1R1C",
    "2qnpHrOzdmOo1S4ox3j17x",
    "2vnB6tuQMaQpORiRdvXF9H",
    "7MoIc5s9KXolCBH1fy9kkw",
    "0wOej91SVqB1zcYkW6xUtA",
    "2eam0iDomRHGBypaDQLwWI",
    "4dwdTW1Lfiq0cM8nBAqIIz",
  ];
  return getListArtists(playlistIds, "rock");
}

export async function getListElectroArtists() {
  const playlistIds = [
    "60d24wfXkVzDSfLS6hyCjZ",
    "7CajNmpbOovFoOoasH2HaY",
    "4tZwfgrHOc3mvqYlEYSvVi",
    "1Cs0zKBU1kc0i8ypK3B9ai",
    "23fqKkggKUBHNkbKtXEls4",
    "2qxJFvFYMEDqd7ui6kSAcq",
    "64KEffDW9EtZ1y2vBYgq8T",
    "69GGBxA162lTqCwzJG5jLp",
    "6nxWCVXbOlEVRexSbLsTer",
    "5fMUXHkw8R8eOP2RNVYEZX",
    "738wLrAtLtCtFOLvQBXOXp",
    "540vIaP2JwjQb9dm3aArA4",
    "7vk5e3vY1uw9plTHJAMwjN",
    "4AVFqumd2ogHFlRbKIjp1t",
    "1vCWHaC5f2uS3yhpwWbIA6",
    "2o5jDhtHVPhrJdv3cEQ99Z",
    "5he5w2lnU9x7JFhnwcekXX",
    "2CIMQHirSU0MQqyYHq0eOx",
    "3dz0NnIZhtKKeXZxLOxCam",
    "4pb4rqWSoGUgxm63xmJ8xc",
    "45eNHdiiabvmbp4erw26rg",
    "5eIbEEQnDM8yuDVB0bimSP",
    "21mKp7DqtSNHhCAU2ugvUw",
    "4D75GcNG95ebPtNvoNVXhz",
    "77AiFEVeAVj2ORpC85QVJs",
    "0SfsnGyD8FpIN4U4WCkBZ5",
    "5Pb27ujIyYb33zBqVysBkj",
    "0Cd6nHYwecCNM1sVEXKlYr",
    "4sTQVOfp9vEMCemLw50sbu",
    "4j5KBTO4tk7up54ZirNGvK",
    "4bL2B6hmLlMWnUEZnorEtG",
    "1HBjj22wzbscIZ9sEb5dyf",
    "6nS5roXSAGhTGr34W6n7Et",
    "240wlM8vDrf6S4zCyzGj2W",
    "6caPJFLv1wesmM7gwK1ACy",
    "1KpCi9BOfviCVhmpI4G2sY",
    "7w1eTNePApzDk8XtgykCPS",
    "28uJnu5EsrGml2tBd7y8ts",
    "1VJ0briNOlXRtJUAzoUJdt",
    "24DO0PijjITGIEWsO8XaPs",
    "0xRXCcSX89eobfrshSVdyu",
    "2WBJQGf1bT1kxuoqziH5g4",
    "2mLA48B366zkELXYx7hcDN",
    "1lJhME1ZpzsEa5M0wW6Mso",
    "4aKdmOXdUKX07HVd3sGgzw",
    "4mncDFjVLUa3s025Tct3Ry",
    "3BkRu2TGd2I1uBxZKddfg1",
    "2RqrWplViWHSGLzlhmDcbt",
    "0cmWgDlu9CwTgxPhf403hb",
    "586uxXMyD5ObPuzjtrzO1Q",
  ];
  return getListArtists(playlistIds, "electro");
}

export async function getListKPopArtists() {
  const playlistIds = [
    "3Nrfpe0tUJi4K4DXYWgMUX",
    "41MozSoPIsD1dJM0CLPjZF",
    "7n2Ycct7Beij7Dj7meI4X0",
    "3cjEqqelV9zb4BYE3qDQ4O",
    "2dIgFjalVxs4ThymZ67YCE",
    "7nqOGRxlXj7N2JYbgNEjYH",
    "2KC9Qb60EaY0kW4eH68vr3",
    "1z4g3DjTBBZKhvAroFlhOM",
    "48eO052eSDcn8aTxiv6QaG",
    "0ghlgldX5Dd6720Q3qFyQB",
    "68KmkJeZGfwe1OUaivBa2L",
    "5t5FqBwTcgKTaWmfEbwQY9",
    "6RHTUrRF63xao58xh9FXYJ",
    "4SpbR6yFEvexJuaBpgAU5p",
    "6HvZYsbFfjnjFrWF950C9d",
    "6YVMFz59CuY7ngCxTxjpxE",
    "4TnGh5PKbSjpYqpIdlW5nz",
    "2hRQKC0gqlZGPrmUKbcchR",
    "3KonOYiLsU53m4yT7gNotP",
    "5R7AMwDeroq6Ls0COQYpS4",
    "6nfDaffa50mKtEOwR8g4df",
    "5BHFSMEjfLVx1JwRWjAOsE",
    "2AfmfGFbe0A0WsTYm0SDTx",
    "01XYiBYaoMJcNhPokrg0l0",
    "52zMTJCKluDlFwMQWmccY7",
    "5V1qsQHdXNm4ZEZHWvFnqQ",
    "0LOK81e9H5lr61HlGGHqwA",
    "3JjvsPeGMbDJqsphe2z8xU",
    "3ZZzT0naD25RhY2uZvIKkJ",
    "3IJCdgkBZbieocLZ4e94GZ",
    "3qNVuliS40BLgXGxhdBdqu",
    "3HqSLMAZ3g3d5poNaI7GOU",
    "7bmYpVgQub656uNTu6qGNQ",
    "2PSJ6YriU7JsFucxACpU7Y",
    "6MoXcK2GyGg7FIyxPU5yW6",
    "7zYj9S9SdIunYCfSm7vzAR",
    "3UwlejyX2b458azZ7eCnHb",
    "64k5e9kV9MdukXjFrR5R37",
    "4ufh0WuMZh6y4Dmdnklvdl",
    "6iVo62B0bdTknRcrktCmak",
    "3eVa5w3URK5duf6eyVDbu9",
    "5L1lO4eRHmJ7a0Q6csE5cT",
    "6UZ0ba50XreR4TM8u322gs",
    "6HaGTQPmzraVmaVxvz6EUc",
    "3JsHnjpbhX4SnySpvpa9DK",
    "2auC28zjQyVTsiZKNgPRGs",
    "5RmQ8k4l3HZ8JoPb4mNsML",
    "1kfWoWgCugPkyxQP8lkRlY",
    "2p48L95TwEaYkSdn6R7LOr",
    "13rF01aOogvnkuQXOlgTW8",
  ];
  return getListArtists(playlistIds, "kpop");
}
