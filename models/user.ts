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
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
  },
  {
    timestamps: true,
    collection: "users", // Spécifie explicitement la collection
  }
);

const User: Model<UserTypes> =
  mongoose.models.User || mongoose.model<UserTypes>("User", userSchema);

export default User;