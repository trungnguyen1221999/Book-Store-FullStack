import express from "express";
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
cartRouter.use(authenticateToken);

// Cart routes
cartRouter.get("/", getCart); // GET /cart
cartRouter.post("/add", addToCart); // POST /cart/add
cartRouter.put("/update/:bookId", updateCartItem); // PUT /cart/update/bookId
cartRouter.delete("/remove/:bookId", removeFromCart); // DELETE /cart/remove/bookId
cartRouter.delete("/clear", clearCart); // DELETE /cart/clear

export default cartRouter;
