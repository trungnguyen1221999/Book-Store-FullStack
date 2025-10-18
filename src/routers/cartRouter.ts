import express, { Request, Response, NextFunction } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// Tất cả cart routes đều cần authentication
cartRouter.use(authenticateToken as express.RequestHandler);

// Cart routes
cartRouter.get("/", getCart as express.RequestHandler); // GET /cart
cartRouter.post("/add", addToCart as express.RequestHandler); // POST /cart/add
cartRouter.put("/update/:bookId", updateCartItem as express.RequestHandler); // PUT /cart/update/bookId
cartRouter.delete("/remove/:bookId", removeFromCart as express.RequestHandler); // DELETE /cart/remove/bookId
cartRouter.delete("/clear", clearCart as express.RequestHandler); // DELETE /cart/clear

export default cartRouter;
