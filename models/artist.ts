import mongoose, { Schema } from "mongoose";

export interface ArtistTypes {
  spotifyId: string;
  name: string;
  genres: string[];
  popularity: number;
  votes: number;
  followers: number;
  images: string[];
  share_link: string;
}

const artistSchema = new Schema<ArtistTypes>(
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
    followers: {
      type: Number,
      required: true,
      min: 0,
    },
    genres: {
      type: [String],
      default: [],
    },
    popularity: {
      type: Number,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [{
      url: String,
      height: Number,
      width: Number,
    }],
    share_link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "artists",
  }
);

const Artist =
  mongoose.models.Artist || mongoose.model<ArtistTypes>("Artist", artistSchema);

export default Artist;
