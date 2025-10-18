import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  getAllUsers,
} from "../controllers/userController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";
import { Request, RequestHandler } from "express";

const userRouter = express.Router();

// Test route
userRouter.get("/test", (req, res) => {
  res.json({ message: "User router works!" });
});

// PUBLIC ROUTES - Không cần authentication
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// PROTECTED ROUTES - Cần accessToken

// User profile routes
userRouter.get(
  "/profile",
  authenticateToken as RequestHandler,
  getUserProfile as RequestHandler
); // GET /users/profile
userRouter.put(
  "/profile",
  authenticateToken as RequestHandler,
  updateUserProfile as RequestHandler
); // PUT /users/profile
userRouter.put(
  "/change-password",
  authenticateToken as RequestHandler,
  changePassword as RequestHandler
); // PUT /users/change-password
// ADMIN ONLY ROUTES
userRouter.get(
  "/all",
  authenticateToken as RequestHandler,
  requireAdmin as RequestHandler,
  getAllUsers as RequestHandler
); // GET /users/all
userRouter.delete(
  "/delete",
  authenticateToken as RequestHandler,
  requireAdmin as RequestHandler,
  deleteUserAccount as RequestHandler
); // DELETE /users/delete

export default userRouter;
