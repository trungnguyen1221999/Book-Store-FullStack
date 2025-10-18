import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Middleware để verify JWT token
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Lấy token từ Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        message: "Access token is required",
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456") as {
      id: string;
      email: string;
      role: string;
    };

    // Add user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Token has expired",
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      message: "Error verifying token",
      error: error instanceof Error ? error.message : error,
    });
    return;
  }
};

// Middleware để check admin role
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "Access denied. Admin role required.",
    });
    return;
  }

  next();
};

// Middleware để check customer role (hoặc admin)
export const requireCustomer = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  if (req.user.role !== "customer" && req.user.role !== "admin") {
    res.status(403).json({
      message: "Access denied. Customer or Admin role required.",
    });
    return;
  }

  next();
};
