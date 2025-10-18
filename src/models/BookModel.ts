import mongoose, { Document, Schema } from "mongoose";

// Book interface for TypeScript
export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  oldPrice: number;
  newPrice?: number;
  quantity: number;
  images: string[];
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Book schema
const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    newPrice: {
      type: Number,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    trending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
