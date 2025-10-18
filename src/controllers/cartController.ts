import { Request, Response } from "express";
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

// GET CART - Lấy giỏ hàng của user
const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.bookId",
      select: "title author newPrice images trending",
    });

    if (!cart) {
      // Tạo cart rỗng nếu chưa có
      cart = await Cart.create({ userId, items: [] });
    }

    return res.status(200).json({
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving cart",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ADD TO CART - Thêm sản phẩm vào giỏ hàng
const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId, quantity = 1 } = req.body;

    if (!bookId) {
      return res.status(400).json({
        message: "Book ID is required",
      });
    }

    // Kiểm tra book có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Kiểm tra quantity có đủ không
    if (quantity > book.quantity) {
      return res.status(400).json({
        message: `Only ${book.quantity} items available in stock`,
      });
    }

    // Tìm hoặc tạo cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Kiểm tra item đã có trong cart chưa
    const existingItemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItemIndex > -1) {
      // Update quantity nếu đã có
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (newQuantity > book.quantity) {
        return res.status(400).json({
          message: `Cannot add ${quantity} more items. Only ${book.quantity} available in stock`,
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Thêm item mới
      cart.items.push({
        bookId: bookId,
        quantity: quantity,
        priceAtTime: book.newPrice,
      });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding item to cart",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// UPDATE CART ITEM - Cập nhật quantity của item trong cart
const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Kiểm tra book có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Kiểm tra quantity có đủ không
    if (quantity > book.quantity) {
      return res.status(400).json({
        message: `Only ${book.quantity} items available in stock`,
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // Tìm item trong cart
    const itemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].priceAtTime = book.newPrice; // Update giá mới nhất

    await cart.save();

    // Populate để trả về thông tin đầy đủ
    await cart.populate({
      path: "items.bookId",
      select: "title author newPrice images trending",
    });

    return res.status(200).json({
      message: "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating cart item",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// REMOVE FROM CART - Xóa item khỏi giỏ hàng
const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // Remove item from cart
    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);

    await cart.save();

    // Populate để trả về thông tin đầy đủ
    await cart.populate({
      path: "items.bookId",
      select: "title author newPrice images trending",
    });

    return res.status(200).json({
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error removing item from cart",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// CLEAR CART - Xóa tất cả items trong cart
const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error clearing cart",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
