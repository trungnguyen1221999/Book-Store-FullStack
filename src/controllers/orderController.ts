import { Request, Response } from "express";
import Order from "../models/OrderModel.js";
import {
  OrderStatus,
  PaymentMethod,
  ICustomerInfo,
} from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Book from "../models/BookModel.js";

// Extend Request type để include user info from JWT
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// CREATE ORDER - Checkout từ cart
const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { customerInfo, paymentMethod, notes, shippingFee = 5.99 } = req.body;

    // Validate customer info
    if (
      !customerInfo ||
      !customerInfo.fullName ||
      !customerInfo.phone ||
      !customerInfo.email ||
      !customerInfo.address
    ) {
      return res.status(400).json({
        message:
          "Customer information is required (fullName, phone, email, address, city, district, ward)",
      });
    }

    // Validate payment method
    if (!Object.values(PaymentMethod).includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    // Lấy cart của user
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.bookId",
      select: "title author newPrice images quantity",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Kiểm tra stock và prepare order items
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cart.items) {
      const book = cartItem.bookId as any;

      // Kiểm tra stock
      if (cartItem.quantity > book.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${book.title}. Available: ${book.quantity}, Requested: ${cartItem.quantity}`,
        });
      }

      // Prepare order item
      const orderItem = {
        bookId: book._id,
        title: book.title,
        author: book.author,
        quantity: cartItem.quantity,
        priceAtTime: cartItem.priceAtTime,
        image: book.images && book.images.length > 0 ? book.images[0] : "",
      };

      orderItems.push(orderItem);
      totalAmount += cartItem.quantity * cartItem.priceAtTime;

      // Update stock
      book.quantity -= cartItem.quantity;
      book.sold += cartItem.quantity;
      await book.save();
    }

    const finalAmount = totalAmount + shippingFee;

    // Tạo order
    const order = await Order.create({
      userId,
      items: orderItems,
      customerInfo: customerInfo as ICustomerInfo,
      paymentMethod,
      totalAmount,
      shippingFee,
      finalAmount,
      notes: notes || "",
    });

    // Clear cart sau khi checkout thành công
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating order",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET USER ORDERS - Lịch sử đơn hàng của user
const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10, status } = req.query;

    // Build filter
    const filter: any = { userId };
    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      filter.orderStatus = status;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 }) // Mới nhất trước
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: {
        orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalOrders: total,
          hasNext: skip + orders.length < total,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving orders",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET ORDER BY ID - Chi tiết đơn hàng
const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving order",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ADMIN: GET ALL ORDERS - Quản lý đơn hàng (Admin only)
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, orderNumber } = req.query;

    // Build filter
    const filter: any = {};
    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      filter.orderStatus = status;
    }
    if (orderNumber) {
      filter.orderNumber = { $regex: orderNumber, $options: "i" };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(filter)
      .populate({
        path: "userId",
        select: "email fullName",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    return res.status(200).json({
      message: "All orders retrieved successfully",
      data: {
        orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalOrders: total,
          hasNext: skip + orders.length < total,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving all orders",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ADMIN: UPDATE ORDER STATUS - Cập nhật trạng thái đơn hàng (Admin only)
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status, adminNotes, deliveryDate } = req.body;

    // Validate status
    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Update fields
    order.orderStatus = status;
    if (adminNotes) order.adminNotes = adminNotes;
    if (deliveryDate) order.deliveryDate = new Date(deliveryDate);

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating order status",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// CANCEL ORDER - Hủy đơn hàng (User có thể hủy khi status = pending)
const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Chỉ cho phép cancel khi status = pending
    if (order.orderStatus !== OrderStatus.PENDING) {
      return res.status(400).json({
        message: "Can only cancel pending orders",
      });
    }

    // Hoàn lại stock
    for (const item of order.items) {
      const book = await Book.findById(item.bookId);
      if (book) {
        book.quantity += item.quantity;
        book.sold -= item.quantity;
        await book.save();
      }
    }

    // Update order status
    order.orderStatus = OrderStatus.CANCELLED;
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error cancelling order",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
