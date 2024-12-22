import mongoose, { Schema, Document, Model } from "mongoose";

interface UserTypes extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  votedTracks: string[];
  isEmailVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  remainingVotes: number;
  lastVoteRefresh: Date;
}

const userSchema = new Schema<UserTypes>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://avatars.githubusercontent.com/u/124599?v=4",
    },
    votedTracks: {
      type: [String],
      required: true,
      default: [],
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    remainingVotes: {
      type: Number,
      required: true,
      default: 5,
      max: 10,
    },
    lastVoteRefresh: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    collection: "users", // Spécifie explicitement la collection
  }
);

const User: Model<UserTypes> =
  mongoose.models.User || mongoose.model<UserTypes>("User", userSchema);

export default User;
