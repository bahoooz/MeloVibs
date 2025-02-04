import mongoose, { Schema, Document } from "mongoose";

export interface ShopItemTypes extends Document {
  name: string;
  description: string;
  type: 'badge' | 'promo_code' | 'discount' | 'giftcard';
  price: number;
  quantity?: number;
  expiresAt?: Date;
  discount?: number;
  brand?: string;
  imageUrl?: string;
  isActive: boolean;
  metadata?: {
    [key: string]: any;
  };
  createdAt: Date;
}

const shopItemSchema = new Schema<ShopItemTypes>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['badge', 'promo_code', 'discount', 'giftcard'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  expiresAt: Date,
  discount: Number,
  brand: String,
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  collection: "shop_items"
});

const ShopItem = mongoose.models.ShopItem || mongoose.model<ShopItemTypes>("ShopItem", shopItemSchema);

export default ShopItem;
