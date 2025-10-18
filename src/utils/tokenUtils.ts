import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate Access Token (short-lived: 15 minutes)
export const generateAccessToken = (payload: {
  id: string;
  email: string;
  role: string;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m", // 15 phút
  });
};

// Generate Refresh Token (long-lived: 7 days)
export const generateRefreshToken = (payload: {
  id: string;
  email: string;
}) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d", // 7 ngày
  });
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

// Generate random refresh token (alternative approach)
export const generateSecureRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
