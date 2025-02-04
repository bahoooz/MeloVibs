export interface Track {
  _id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    release_date: string;
    share_link: string;
  };
  duration_ms: number;
  genres: string[];
  popularity: number;
  votes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
} 