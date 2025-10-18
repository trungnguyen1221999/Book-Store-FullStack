import express, { RequestHandler } from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";


const orderRouter = express.Router();

// PUBLIC ROUTES (cần authentication)

// POST /api/orders - Checkout/Tạo đơn hàng từ cart
orderRouter.post("/", authenticateToken as RequestHandler, createOrder as RequestHandler);

// GET /api/orders - Lấy danh sách đơn hàng của user
orderRouter.get(
  "/",
  authenticateToken as RequestHandler,
  getUserOrders as RequestHandler
);

// GET /api/orders/:orderId - Lấy chi tiết đơn hàng
orderRouter.get("/:orderId", authenticateToken as RequestHandler, getOrderById as RequestHandler);

// PUT /api/orders/:orderId/cancel - Hủy đơn hàng (chỉ khi status = pending)
orderRouter.put("/:orderId/cancel", authenticateToken as RequestHandler, cancelOrder as RequestHandler);

// ADMIN ROUTES (cần admin permission)

// GET /api/orders/admin/all - Lấy tất cả đơn hàng (Admin only)
orderRouter.get("/admin/all", authenticateToken as RequestHandler, requireAdmin as RequestHandler, getAllOrders as RequestHandler);

// PUT /api/orders/admin/:orderId/status - Cập nhật trạng thái đơn hàng (Admin only)
orderRouter.put(
  "/admin/:orderId/status",
  authenticateToken as RequestHandler,
  requireAdmin as RequestHandler,
  updateOrderStatus as RequestHandler
);

export default orderRouter;
