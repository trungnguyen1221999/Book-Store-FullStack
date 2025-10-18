import mongoose, { Document, Schema } from "mongoose";

// Order Item interface (copy từ cart khi checkout)
export interface IOrderItem {
  bookId: mongoose.Schema.Types.ObjectId;
  title: string; // Lưu title để tránh phụ thuộc vào Book model
  author: string; // Lưu author
  quantity: number;
  priceAtTime: number; // Giá tại thời điểm đặt hàng
  image: string; // Lưu 1 image đại diện
}

// Customer Info interface
export interface ICustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

// Order Status enum
export enum OrderStatus {
  PENDING = "pending", // Chờ xác nhận
  CONFIRMED = "confirmed", // Đã xác nhận
  PROCESSING = "processing", // Đang xử lý
  SHIPPING = "shipping", // Đang giao hàng
  DELIVERED = "delivered", // Đã giao
  CANCELLED = "cancelled", // Đã hủy
}

// Payment Method enum
export enum PaymentMethod {
  COD = "cod", // Cash on Delivery
  BANK_TRANSFER = "bank_transfer", // Chuyển khoản
  MOMO = "momo", // Ví MoMo
  ZALOPAY = "zalopay", // ZaloPay
}

// Order interface for TypeScript
export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderNumber: string; // Mã đơn hàng unique
  items: IOrderItem[];
  customerInfo: ICustomerInfo;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  totalAmount: number; // Tổng tiền
  shippingFee: number; // Phí ship
  finalAmount: number; // Tổng cuối = totalAmount + shippingFee
  notes?: string; // Ghi chú từ khách hàng
  adminNotes?: string; // Ghi chú từ admin
  orderDate: Date;
  deliveryDate?: Date; // Ngày giao hàng dự kiến
}

// Order Item Schema
const OrderItemSchema = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

// Customer Info Schema
const CustomerInfoSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[0-9]{10,11}$/.test(v); // 10-11 số
      },
      message: "Phone number must be 10-11 digits",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
});

// Order Schema
const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [OrderItemSchema],
    customerInfo: {
      type: CustomerInfoSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
      default: PaymentMethod.COD,
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
      default: 30000, // Default 30k shipping
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number trước khi save
OrderSchema.pre("save", function (next) {
  if (this.isNew) {
    // Generate order number: ORD + timestamp + random
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.orderNumber = `ORD${timestamp}${random}`;
  }
  next();
});

// Create and export the model
const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
