import mongoose, { Document, Schema } from "mongoose";

// Book interface for TypeScript
export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  oldPrice?: number;
  newPrice: number;
  coverColor?: string[];
  quantity: number;
  sold: number;
  images: string[];
  trending: boolean;
  categoryId?: mongoose.Schema.Types.ObjectId;
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
      min: 0,
    },
    newPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    coverColor: [
      {
        type: String,
        enum: [
          "red",
          "blue",
          "green",
          "yellow",
          "black",
          "white",
          "gray",
          "pink",
        ],
      },
    ],
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sold: {
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
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
