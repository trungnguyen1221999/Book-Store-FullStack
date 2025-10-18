import { Request } from "express";

// Định nghĩa AuthRequest interface chung cho toàn bộ ứng dụng
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
