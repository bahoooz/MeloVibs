import mongoose, { Schema, Document, Model } from "mongoose";

export interface InventoryItem {
  itemId: mongoose.Types.ObjectId;
  acquiredAt: Date;
  type: string;
  name: string;
}

export interface UserTypes extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  votedTracks: string[];
  isEmailVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  remainingVotes: number;
  lastVoteRefresh: Date;
  points: number;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  inventory: InventoryItem[];
  newsletterUnsubscribeToken: String;
  isSubscribedToNewsletter: {
    type: Boolean,
    default: true
  };
}

const userSchema = new Schema<UserTypes>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address",
      ],
      minlength: 1,
      maxlength: 96,
    },
    password: {
      type: String,
      required: false,
      minlength: 8,
      maxlength: 64,
    },
    votedTracks: {
      type: [String],
      required: true,
      default: [],
    },
    verificationToken: {
      type: String,
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
    points: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    inventory: [{
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'ShopItem',
        required: true
      },
      acquiredAt: {
        type: Date,
        default: Date.now,
      },
      usedAt: Date,
      expiresAt: Date,
      code: String,
    }],
    newsletterUnsubscribeToken: String,
    isSubscribedToNewsletter: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    collection: "users", // Spécifie explicitement la collection
  }
);

// Ajouter un index pour optimiser les recherches
userSchema.index({ 'inventory.itemId': 1 });

const User: Model<UserTypes> =
  mongoose.models.User || mongoose.model<UserTypes>("User", userSchema);

export default User;
