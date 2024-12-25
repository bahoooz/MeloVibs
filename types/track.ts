export interface Track {
  _id: string;
  spotifyId: string;
  name: string;
  previewUrl: string | null;
  artists: {
    id: string;
    name: string;
    _id: string;
  }[];
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
      _id: string;
    }[];
    release_date: string;
    share_link: string;
  };
  popularity: number;
  duration_ms: number;
  genres: string[];
  votes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
} 