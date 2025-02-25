import mongoose, { Schema, Document } from "mongoose";

export interface TrackTypes extends Document {
  spotifyId: string;
  name: string;
  previewUrl: string | null;
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
  genres: string[];
  popularity: number;
  votes: number;
  duration_ms: number;
}

const trackSchema = new Schema<TrackTypes>(
  {
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      default: null,
    },
    artists: [{
      id: String,
      name: String,
    }],
    album: {
      id: String,
      name: String,
      images: [{
        url: String,
        height: Number,
        width: Number,
      }],
      release_date: {
        type: String,
        required: true,
      },
      share_link: {
        type: String,
        required: true,
      },
    },
    genres: {
      type: [String],
      default: [],
    },
    popularity: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
    duration_ms: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "tracks",
  }
);

const Track = mongoose.models.Track || mongoose.model<TrackTypes>("Track", trackSchema);

export default Track; 