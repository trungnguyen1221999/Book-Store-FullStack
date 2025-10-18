import mongoose, { Document, Schema } from "mongoose";

// Category interface for TypeScript
export interface ICategory extends Document {
  name: string;
  description?: string;
  slug: string;
  sold: number;
  imageURL?: string;
}

// Category schema
const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    sold: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    imageURL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
