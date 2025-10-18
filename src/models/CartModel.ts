import mongoose, { Document, Schema } from "mongoose";

// Cart Item interface
export interface ICartItem {
  bookId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  priceAtTime: number; // Lưu giá tại thời điểm add (case giá thay đổi)
}

// Cart interface for TypeScript
export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

// Cart Item Schema
const CartItemSchema = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Cart Schema
const CartSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Mỗi user chỉ có 1 cart
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

// No need for calculate methods - Frontend will handle all calculations

// Create and export the model
const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
