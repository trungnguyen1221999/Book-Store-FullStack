import { Request, Response } from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";

// Extend Request type để include user info from JWT
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// REGISTER - Đăng ký user mới
const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role = "customer",
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      id: (newUser._id as any).toString(),
      email: newUser.email,
      role: newUser.role,
    });

    const refreshToken = generateRefreshToken({
      id: (newUser._id as any).toString(),
      email: newUser.email,
    });

    // Save refresh token to database
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Remove password from response
    const userResponse = newUser.toObject();
    const {
      password: _,
      refreshToken: __,
      ...userWithoutSensitiveData
    } = userResponse;

    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: userWithoutSensitiveData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// LOGIN - Đăng nhập
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: (user._id as any).toString(),
      email: user.email,
    });

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    const {
      password: _,
      refreshToken: __,
      ...userWithoutSensitiveData
    } = userResponse;

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: userWithoutSensitiveData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET USER PROFILE - Lấy thông tin user từ token
const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    // User info đã được set trong auth middleware
    const userId = req.user?.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving user profile",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// UPDATE USER PROFILE - Cập nhật thông tin user từ token
const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    // Không cho phép update password qua route này
    if (updates.password) {
      return res.status(400).json({
        message: "Use change password endpoint to update password",
      });
    }

    // Không cho phép update email và role
    delete updates.email;
    delete updates.role;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// CHANGE PASSWORD - Đổi mật khẩu
const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error changing password",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// DELETE USER ACCOUNT - Xóa tài khoản
const deleteUserAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting account",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ADMIN ONLY - Get all users
const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving users",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// REFRESH TOKEN - Tạo access token mới từ refresh token
const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken) as any;

    // Tìm user và kiểm tra refresh token có match không
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      id: String(user._id),
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired refresh token",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// LOGOUT - Xóa refresh token
const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    // Xóa refresh token khỏi database
    await User.findByIdAndUpdate(userId, {
      $unset: { refreshToken: 1 },
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during logout",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  getAllUsers,
  refreshAccessToken,
  logoutUser,
};
