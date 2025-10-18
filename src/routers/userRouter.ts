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

const userRouter = express.Router();

// Test route
userRouter.get("/test", (req, res) => {
  res.json({ message: "User router works!" });
});

// PUBLIC ROUTES - Không cần authentication
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// PROTECTED ROUTES - Cần accessToken
userRouter.use(authenticateToken); // All routes below require authentication

// User profile routes
userRouter.get("/profile", getUserProfile); // GET /users/profile
userRouter.put("/profile", updateUserProfile); // PUT /users/profile
userRouter.put("/change-password", changePassword); // PUT /users/change-password
userRouter.delete("/account", deleteUserAccount); // DELETE /users/account

// ADMIN ONLY ROUTES
userRouter.get("/all", requireAdmin, getAllUsers); // GET /users/all


export default userRouter;
