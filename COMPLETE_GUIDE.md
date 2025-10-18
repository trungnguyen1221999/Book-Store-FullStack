# 📚 Complete E-commerce Backend Development Guide

_Hướng dẫn phát triển Backend E-commerce hoàn chỉnh_

## 🎯 Project Overview / Tổng quan dự án

**English**: This is a comprehensive guide to building a complete e-commerce backend system for laptop retail business using modern technologies and best practices.

**Tiếng Việt**: Đây là hướng dẫn toàn diện để xây dựng hệ thống backend e-commerce hoàn chỉnh cho kinh doanh laptop sử dụng các công nghệ và thực hành hiện đại.

### 🏗️ **Architecture / Kiến trúc**

- **Pattern**: MVC (Model-View-Controller)
- **API Style**: RESTful API with JWT Authentication
- **Authentication**: JWT with Refresh Token System (15min access + 7 days refresh)
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript for type safety

### 🛠️ **Tech Stack / Công nghệ sử dụng**

| Technology               | Purpose               | Mục đích                |
| ------------------------ | --------------------- | ----------------------- |
| **Node.js + TypeScript** | Backend Runtime       | Môi trường chạy backend |
| **Express.js**           | Web Framework         | Framework web           |
| **MongoDB + Mongoose**   | Database & ODM        | Cơ sở dữ liệu & ODM     |
| **JWT**                  | Authentication        | Xác thực người dùng     |
| **bcryptjs**             | Password Hashing      | Mã hóa mật khẩu         |
| **Cors**                 | Cross-Origin Requests | Yêu cầu cross-origin    |

---

## 🚀 **Step 1: Project Setup / Bước 1: Thiết lập dự án**

### **1.1 Initialize Project / Khởi tạo dự án**

**English**: Create a new directory and initialize npm package
**Tiếng Việt**: Tạo thư mục mới và khởi tạo npm package

```bash
mkdir Laptop-Shop-Ecommerce-FullStack
cd Laptop-Shop-Ecommerce-FullStack
npm init -y
```

### **1.2 Install Dependencies / Cài đặt Dependencies**

**Core Dependencies / Dependencies chính**:

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
```

**Development Dependencies / Dependencies phát triển**:

```bash
npm install -D typescript @types/node @types/express @types/bcryptjs @types/jsonwebtoken @types/cors ts-node nodemon
```

**Optional OAuth Dependencies** _(if using Google/Facebook login)_:

```bash
npm install passport passport-google-oauth20 passport-facebook express-session
npm install -D @types/passport @types/passport-google-oauth20 @types/passport-facebook @types/express-session
```

### **1.3 TypeScript Configuration / Cấu hình TypeScript**

Create `tsconfig.json` / _Tạo file `tsconfig.json`_:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### **1.4 Package.json Configuration / Cấu hình Package.json**

Update your `package.json` / _Cập nhật `package.json`_:

```json
{
  "name": "laptop-shop-ecommerce-fullstack",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon --exec \"node --loader ts-node/esm\" src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["ecommerce", "laptop", "nodejs", "typescript", "express"],
  "author": "Your Name",
  "license": "MIT"
}
```

### **1.5 Environment Configuration / Cấu hình môi trường**

Create `.env` file / _Tạo file `.env`_:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/laptop-shop
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop-shop

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-at-least-32-characters

# Optional OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
SESSION_SECRET=your-session-secret
```

---

## 🗂️ **Step 2: Project Structure / Bước 2: Cấu trúc dự án**

**English**: Organize your project with a clean, scalable architecture
**Tiếng Việt**: Tổ chức dự án với kiến trúc sạch và có thể mở rộng

```
📁 Laptop-Shop-Ecommerce-FullStack/
├── 📁 src/
│   ├── 📁 Database/                # Database connection / Kết nối cơ sở dữ liệu
│   │   └── 📄 ConnectMongoDB.ts
│   ├── 📁 models/                  # Database schemas / Schema cơ sở dữ liệu
│   │   ├── 📄 UserModel.ts         # User schema / Schema người dùng
│   │   ├── 📄 BookModel.ts         # Product schema / Schema sản phẩm
│   │   ├── 📄 CategoryModel.ts     # Category schema / Schema danh mục
│   │   ├── 📄 CartModel.ts         # Cart schema / Schema giỏ hàng
│   │   └── 📄 OrderModel.ts        # Order schema / Schema đơn hàng
│   ├── 📁 controllers/             # Business logic / Logic nghiệp vụ
│   │   ├── 📄 userController.ts    # User operations / Thao tác người dùng
│   │   ├── 📄 BookController.ts    # Product operations / Thao tác sản phẩm
│   │   ├── 📄 categoryController.ts # Category operations / Thao tác danh mục
│   │   ├── 📄 cartController.ts    # Cart operations / Thao tác giỏ hàng
│   │   └── 📄 orderController.ts   # Order operations / Thao tác đơn hàng
│   ├── 📁 routers/                 # API routes / Route API
│   │   ├── 📄 userRouter.ts        # User routes / Route người dùng
│   │   ├── 📄 BookRouter.ts        # Product routes / Route sản phẩm
│   │   ├── 📄 categoryRouter.ts    # Category routes / Route danh mục
│   │   ├── 📄 cartRouter.ts        # Cart routes / Route giỏ hàng
│   │   └── 📄 orderRouter.ts       # Order routes / Route đơn hàng
│   ├── 📁 middleware/              # Custom middleware / Middleware tùy chỉnh
│   │   └── 📄 authMiddleware.ts    # JWT authentication / Xác thực JWT
│   ├── 📁 utils/                   # Utility functions / Hàm tiện ích
│   │   └── 📄 tokenUtils.ts        # JWT utilities / Tiện ích JWT
│   ├── 📁 types/                   # TypeScript types / Kiểu TypeScript
│   │   └── 📄 AuthRequest.ts       # Custom request types / Kiểu request tùy chỉnh
│   └── 📄 server.ts                # Entry point / Điểm vào
├── 📄 .env                         # Environment variables / Biến môi trường
├── 📄 .gitignore                   # Git ignore rules / Quy tắc Git ignore
├── 📄 package.json                 # Dependencies / Dependencies
├── 📄 tsconfig.json               # TypeScript config / Cấu hình TypeScript
├── 📄 README.md                   # Project documentation / Tài liệu dự án
└── 📄 API_GUIDE.md               # API documentation / Tài liệu API
```

**Create Directory Structure / Tạo cấu trúc thư mục**:

```bash
# Create all directories at once / Tạo tất cả thư mục cùng lúc
mkdir -p src/{Database,models,controllers,routers,middleware,utils,types}
```

---

## 🔧 **Step 3: Database Setup / Bước 3: Thiết lập cơ sở dữ liệu**

### **3.1 MongoDB Connection / Kết nối MongoDB**

Create `src/Database/ConnectMongoDB.ts` / _Tạo `src/Database/ConnectMongoDB.ts`_:

```typescript
import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * Kết nối đến cơ sở dữ liệu MongoDB
 */
const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // MongoDB connection options / Tùy chọn kết nối MongoDB
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(mongoURI, options);

    console.log(
      "✅ MongoDB connected successfully / Kết nối MongoDB thành công"
    );
    console.log(`📊 Connected to database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(
      "❌ MongoDB connection failed / Kết nối MongoDB thất bại:",
      error
    );
    process.exit(1);
  }
};

// Handle MongoDB connection events / Xử lý sự kiện kết nối MongoDB
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("📤 MongoDB disconnected / MongoDB đã ngắt kết nối");
});

// Graceful shutdown / Tắt một cách an toàn
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔐 MongoDB connection closed through app termination");
  process.exit(0);
});

export default connectMongoDB;
```

---

## 👤 **Step 4: User Management System / Bước 4: Hệ thống quản lý người dùng**

### **4.1 JWT Token Utilities / Tiện ích JWT Token**

Create `src/utils/tokenUtils.ts` / _Tạo `src/utils/tokenUtils.ts`_:

```typescript
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role?: string;
}

/**
 * Generate Access Token (15 minutes)
 * Tạo Access Token (15 phút)
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
    issuer: "laptop-shop",
    audience: "laptop-shop-users",
  });
};

/**
 * Generate Refresh Token (7 days)
 * Tạo Refresh Token (7 ngày)
 */
export const generateRefreshToken = (
  payload: Omit<TokenPayload, "role">
): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
    issuer: "laptop-shop",
    audience: "laptop-shop-users",
  });
};

/**
 * Verify Access Token / Xác thực Access Token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!, {
    issuer: "laptop-shop",
    audience: "laptop-shop-users",
  }) as TokenPayload;
};

/**
 * Verify Refresh Token / Xác thực Refresh Token
 */
export const verifyRefreshToken = (
  token: string
): Omit<TokenPayload, "role"> => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!, {
    issuer: "laptop-shop",
    audience: "laptop-shop-users",
  }) as Omit<TokenPayload, "role">;
};
```

### **4.2 TypeScript Types / Kiểu TypeScript**

Create `src/types/AuthRequest.ts` / _Tạo `src/types/AuthRequest.ts`_:

```typescript
import { Request } from "express";

/**
 * Extended Request interface for authenticated routes
 * Interface Request mở rộng cho các route được xác thực
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
```

### **4.3 User Model / Mô hình người dùng**

Create `src/models/UserModel.ts` / _Tạo `src/models/UserModel.ts`_:

```typescript
import mongoose, { Document, Schema } from "mongoose";

/**
 * User interface for TypeScript
 * Interface User cho TypeScript
 */
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: "customer" | "admin";
  isEmailVerified: boolean;
  refreshToken?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  dateOfBirth?: Date;
}

/**
 * User Schema Definition / Định nghĩa Schema User
 */
const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required / Tên là bắt buộc"],
      trim: true,
      maxlength: [
        50,
        "First name cannot exceed 50 characters / Tên không được quá 50 ký tự",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required / Họ là bắt buộc"],
      trim: true,
      maxlength: [
        50,
        "Last name cannot exceed 50 characters / Họ không được quá 50 ký tự",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required / Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email / Vui lòng nhập email hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required / Mật khẩu là bắt buộc"],
      minlength: [
        6,
        "Password must be at least 6 characters / Mật khẩu phải có ít nhất 6 ký tự",
      ],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[0-9+\-\s()]{8,15}$/,
        "Please enter a valid phone number / Vui lòng nhập số điện thoại hợp lệ",
      ],
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Index for better query performance / Index để tăng hiệu suất truy vấn
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
```

### **4.4 Authentication Middleware / Middleware xác thực**

Create `src/middleware/authMiddleware.ts` / _Tạo `src/middleware/authMiddleware.ts`_:

```typescript
import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/tokenUtils.js";
import { AuthRequest } from "../types/AuthRequest.js";

/**
 * JWT Authentication Middleware
 * Middleware xác thực JWT
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      message: "Access token is required / Token truy cập là bắt buộc",
    });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "customer",
    };
    next();
  } catch (error) {
    res.status(403).json({
      message:
        "Invalid or expired access token / Token không hợp lệ hoặc đã hết hạn",
      error:
        error instanceof Error ? error.message : "Token verification failed",
    });
  }
};

/**
 * Admin Role Middleware
 * Middleware phân quyền Admin
 */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      message: "Authentication required / Cần xác thực",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "Admin access required / Cần quyền admin",
    });
    return;
  }

  next();
};
```

### **4.5 User Controller / Controller người dùng**

Create `src/controllers/userController.ts` / _Tạo `src/controllers/userController.ts`_:

```typescript
import { Request, Response } from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";
import { AuthRequest } from "../types/AuthRequest.js";

/**
 * Register User / Đăng ký người dùng
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role = "customer",
    } = req.body;

    // Validation / Xác thực
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, and password are required / Tên, họ, email và mật khẩu là bắt buộc",
      });
    }

    // Check if user exists / Kiểm tra người dùng đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "User with this email already exists / Người dùng với email này đã tồn tại",
      });
    }

    // Hash password / Mã hóa mật khẩu
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user / Tạo người dùng mới
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Generate tokens / Tạo token
    const accessToken = generateAccessToken({
      id: String(newUser._id),
      email: newUser.email,
      role: newUser.role,
    });

    const refreshToken = generateRefreshToken({
      id: String(newUser._id),
      email: newUser.email,
    });

    // Save refresh token / Lưu refresh token
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Remove sensitive data from response / Xóa dữ liệu nhạy cảm khỏi phản hồi
    const userResponse = newUser.toObject();
    const {
      password: _,
      refreshToken: __,
      ...userWithoutSensitiveData
    } = userResponse;

    return res.status(201).json({
      message: "User registered successfully / Đăng ký người dùng thành công",
      accessToken,
      refreshToken,
      user: userWithoutSensitiveData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user / Lỗi đăng ký người dùng",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Login User / Đăng nhập người dùng
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation / Xác thực
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required / Email và mật khẩu là bắt buộc",
      });
    }

    // Find user with password / Tìm người dùng với mật khẩu
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password / Email hoặc mật khẩu không hợp lệ",
      });
    }

    // Check password / Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password / Email hoặc mật khẩu không hợp lệ",
      });
    }

    // Generate tokens / Tạo token
    const accessToken = generateAccessToken({
      id: String(user._id),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: String(user._id),
      email: user.email,
    });

    // Save refresh token / Lưu refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Remove sensitive data / Xóa dữ liệu nhạy cảm
    const userResponse = user.toObject();
    const {
      password: _,
      refreshToken: __,
      ...userWithoutSensitiveData
    } = userResponse;

    return res.status(200).json({
      message: "Login successful / Đăng nhập thành công",
      accessToken,
      refreshToken,
      user: userWithoutSensitiveData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in / Lỗi đăng nhập",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Refresh Access Token / Làm mới Access Token
 */
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required / Refresh token là bắt buộc",
      });
    }

    // Verify refresh token / Xác thực refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user and verify refresh token / Tìm người dùng và xác thực refresh token
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token / Refresh token không hợp lệ",
      });
    }

    // Generate new access token / Tạo access token mới
    const newAccessToken = generateAccessToken({
      id: String(user._id),
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message:
        "Access token refreshed successfully / Làm mới access token thành công",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message:
        "Invalid or expired refresh token / Refresh token không hợp lệ hoặc đã hết hạn",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Logout User / Đăng xuất người dùng
 */
export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    // Remove refresh token from database / Xóa refresh token khỏi database
    await User.findByIdAndUpdate(userId, {
      $unset: { refreshToken: 1 },
    });

    return res.status(200).json({
      message: "Logout successful / Đăng xuất thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during logout / Lỗi khi đăng xuất",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Get User Profile / Lấy thông tin người dùng
 */
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({
        message: "User not found / Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      message:
        "User profile retrieved successfully / Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Error retrieving user profile / Lỗi khi lấy thông tin người dùng",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Update User Profile / Cập nhật thông tin người dùng
 */
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    // Không cho phép cập nhật một số trường / Don't allow updating certain fields
    delete updates.password;
    delete updates.email;
    delete updates.role;
    delete updates.refreshToken;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found / Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully / Cập nhật thông tin thành công",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile / Lỗi khi cập nhật thông tin",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Change Password / Đổi mật khẩu
 */
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required / Mật khẩu hiện tại và mật khẩu mới là bắt buộc",
      });
    }

    // Find user with password / Tìm người dùng với mật khẩu
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found / Không tìm thấy người dùng",
      });
    }

    // Verify current password / Xác thực mật khẩu hiện tại
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect / Mật khẩu hiện tại không đúng",
      });
    }

    // Hash new password / Mã hóa mật khẩu mới
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password / Cập nhật mật khẩu
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    return res.status(200).json({
      message: "Password changed successfully / Đổi mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error changing password / Lỗi khi đổi mật khẩu",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Delete User Account / Xóa tài khoản người dùng
 */
export const deleteUserAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found / Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully / Xóa tài khoản thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting account / Lỗi khi xóa tài khoản",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Get All Users (Admin Only) / Lấy tất cả người dùng (Chỉ Admin)
 */
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    // Check admin role / Kiểm tra quyền admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only / Từ chối truy cập. Chỉ Admin",
      });
    }

    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json({
      message:
        "Users retrieved successfully / Lấy danh sách người dùng thành công",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving users / Lỗi khi lấy danh sách người dùng",
      error: error instanceof Error ? error.message : error,
    });
  }
};
```

### **4.6 User Router / Router người dùng**

Create `src/routers/userRouter.ts` / _Tạo `src/routers/userRouter.ts`_:

```typescript
import express, { RequestHandler } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
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

// Test route / Route test
userRouter.get("/test", (req, res) => {
  res.json({
    message: "User router works! / Router người dùng hoạt động!",
    timestamp: new Date().toISOString(),
  });
});

// PUBLIC ROUTES - No authentication required / Route công khai - Không cần xác thực
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

// PROTECTED ROUTES - Authentication required / Route được bảo vệ - Cần xác thực
userRouter.post(
  "/logout",
  authenticateToken as RequestHandler,
  logoutUser as RequestHandler
);

userRouter.get(
  "/profile",
  authenticateToken as RequestHandler,
  getUserProfile as RequestHandler
);

userRouter.put(
  "/profile",
  authenticateToken as RequestHandler,
  updateUserProfile as RequestHandler
);

userRouter.put(
  "/change-password",
  authenticateToken as RequestHandler,
  changePassword as RequestHandler
);

userRouter.delete(
  "/account",
  authenticateToken as RequestHandler,
  deleteUserAccount as RequestHandler
);

// ADMIN ROUTES - Admin access required / Route Admin - Cần quyền admin
userRouter.get(
  "/admin/users",
  authenticateToken as RequestHandler,
  requireAdmin as RequestHandler,
  getAllUsers as RequestHandler
);

export default userRouter;
```

---

## 🖥️ **Step 5: Server Setup / Bước 5: Thiết lập server**

### **5.1 Main Server File / File server chính**

Create `src/server.ts` / _Tạo `src/server.ts`_:

```typescript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./Database/ConnectMongoDB.js";
import userRouter from "./routers/userRouter.js";

// Load environment variables / Tải biến môi trường
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URLs
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes / Định tuyến
app.get("/", (req, res) => {
  res.json({
    message:
      "🚀 Laptop Shop E-commerce API is running! / API cửa hàng laptop đang chạy!",
    version: "1.0.0",
    endpoints: {
      users: "/users",
      // Add other endpoints here as you create them
    },
    documentation: {
      readme: "/README.md",
      api_guide: "/API_GUIDE.md",
    },
  });
});

app.use("/users", userRouter);

// 404 Handler / Xử lý 404
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found / Không tìm thấy route",
    requestedUrl: req.originalUrl,
    method: req.method,
  });
});

// Global Error Handler / Xử lý lỗi toàn cục
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global error:", err);
    res.status(500).json({
      message: "Internal server error / Lỗi server nội bộ",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// Start server / Khởi động server
const startServer = async () => {
  try {
    // Connect to MongoDB / Kết nối MongoDB
    await connectMongoDB();

    // Start listening / Bắt đầu lắng nghe
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📱 API URL: http://localhost:${PORT}`);
      console.log(`📚 Documentation: http://localhost:${PORT}/README.md`);
      console.log(
        "✅ Server started successfully / Server khởi động thành công"
      );
    });
  } catch (error) {
    console.error(
      "❌ Failed to start server / Khởi động server thất bại:",
      error
    );
    process.exit(1);
  }
};

startServer();
```

### **5.2 Git Configuration / Cấu hình Git**

Create `.gitignore` / _Tạo `.gitignore`_:

```gitignore
# Dependencies / Phụ thuộc
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables / Biến môi trường
.env
.env.local
.env.development
.env.production

# Build output / Kết quả build
dist/
build/

# IDE files / File IDE
.vscode/
.idea/
*.swp
*.swo

# OS generated files / File được tạo bởi OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs / Nhật ký
logs/
*.log

# Runtime data / Dữ liệu runtime
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Optional npm cache directory
.npm
```

---

## 🚀 **Step 6: Testing the System / Bước 6: Kiểm tra hệ thống**

### **6.1 Build and Run / Build và chạy**

```bash
# Build the project / Build dự án
npm run build

# Run in development mode / Chạy ở chế độ phát triển
npm run dev

# Run in production mode / Chạy ở chế độ sản xuất
npm start
```

### **6.2 Test API Endpoints / Kiểm tra API endpoints**

**Register User / Đăng ký người dùng**:

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login User / Đăng nhập người dùng**:

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Profile (with token) / Lấy thông tin (với token)**:

```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Refresh Token / Làm mới token**:

```bash
curl -X POST http://localhost:5000/users/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

---

## 🎯 **Next Steps / Bước tiếp theo**

### **7.1 Expand the System / Mở rộng hệ thống**

1. **Product Management / Quản lý sản phẩm**

   - Create BookModel for laptops / Tạo BookModel cho laptop
   - Implement CRUD operations / Triển khai thao tác CRUD
   - Add image upload functionality / Thêm tính năng upload ảnh

2. **Shopping Cart / Giỏ hàng**

   - Create CartModel / Tạo CartModel
   - Implement add/remove/update cart items / Triển khai thêm/xóa/cập nhật sản phẩm

3. **Order Management / Quản lý đơn hàng**

   - Create OrderModel / Tạo OrderModel
   - Implement order processing / Triển khai xử lý đơn hàng
   - Add payment integration / Tích hợp thanh toán

4. **Category Management / Quản lý danh mục**
   - Create CategoryModel / Tạo CategoryModel
   - Implement category hierarchy / Triển khai phân cấp danh mục

### **7.2 Advanced Features / Tính năng nâng cao**

- **Email Verification / Xác thực email**
- **Password Reset / Đặt lại mật khẩu**
- **File Upload / Upload file**
- **Search & Filtering / Tìm kiếm & lọc**
- **Pagination / Phân trang**
- **Rate Limiting / Giới hạn tỷ lệ**
- **API Documentation (Swagger) / Tài liệu API**
- **Unit Testing / Kiểm tra đơn vị**
- **Docker Containerization / Containerization Docker**
- **CI/CD Pipeline / Pipeline CI/CD**

---

## 🛡️ **Security Best Practices / Thực hành bảo mật tốt nhất**

### **Authentication Security / Bảo mật xác thực**

- ✅ **Short-lived access tokens (15 minutes) / Access token ngắn hạn (15 phút)**
- ✅ **Long-lived refresh tokens (7 days) / Refresh token dài hạn (7 ngày)**
- ✅ **Secure password hashing with bcrypt / Mã hóa mật khẩu an toàn với bcrypt**
- ✅ **JWT tokens with issuer and audience validation / JWT token với xác thực issuer và audience**

### **Data Protection / Bảo vệ dữ liệu**

- ✅ **Input validation and sanitization / Xác thực và làm sạch đầu vào**
- ✅ **Password field exclusion from queries / Loại trừ trường password khỏi truy vấn**
- ✅ **Refresh token exclusion from responses / Loại trừ refresh token khỏi phản hồi**
- ✅ **Environment variables for secrets / Biến môi trường cho thông tin bí mật**

### **Additional Security Measures / Biện pháp bảo mật bổ sung**

- 🔄 **Rate limiting for API endpoints / Giới hạn tỷ lệ cho API endpoints**
- 🔄 **CORS configuration / Cấu hình CORS**
- 🔄 **Helmet for security headers / Helmet cho header bảo mật**
- 🔄 **Request size limiting / Giới hạn kích thước request**

---

## 📊 **Performance Optimization / Tối ưu hóa hiệu suất**

### **Database Optimization / Tối ưu hóa cơ sở dữ liệu**

- ✅ **MongoDB connection pooling / Kết nối pool MongoDB**
- ✅ **Database indexes for frequent queries / Index database cho truy vấn thường xuyên**
- 🔄 **Pagination for large datasets / Phân trang cho tập dữ liệu lớn**
- 🔄 **Aggregation pipelines for complex queries / Pipeline tổng hợp cho truy vấn phức tạp**

### **API Performance / Hiệu suất API**

- 🔄 **Response caching / Cache phản hồi**
- 🔄 **Compression middleware / Middleware nén**
- 🔄 **API versioning / Phiên bản API**
- 🔄 **Load balancing / Cân bằng tải**

---

## 📚 **Resources / Tài nguyên**

### **Documentation / Tài liệu**

- [Express.js Official Docs](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [bcrypt.js Documentation](https://github.com/dcodeIO/bcrypt.js)

### **Best Practices / Thực hành tốt nhất**

- Always validate input data / Luôn xác thực dữ liệu đầu vào
- Use environment variables for secrets / Dùng biến môi trường cho thông tin bí mật
- Implement proper error handling / Triển khai xử lý lỗi đúng cách
- Use TypeScript for type safety / Dùng TypeScript để an toàn kiểu
- Follow RESTful API conventions / Tuân theo quy ước RESTful API
- Implement comprehensive logging / Triển khai logging toàn diện
- Use proper HTTP status codes / Sử dụng mã trạng thái HTTP đúng cách

### **Tools for Testing / Công cụ kiểm tra**

- **Postman** - API testing / Kiểm tra API
- **Thunder Client** - VS Code extension for API testing
- **Insomnia** - API client
- **curl** - Command line tool / Công cụ dòng lệnh

---

## ❤️ **Conclusion / Kết luận**

**English**: You now have a solid foundation for an e-commerce backend with TypeScript, Express, MongoDB, and JWT authentication with refresh tokens. This system provides secure user management with modern authentication practices including short-lived access tokens and long-lived refresh tokens for optimal security and user experience.

**Tiếng Việt**: Bây giờ bạn đã có nền tảng vững chắc cho backend e-commerce với TypeScript, Express, MongoDB và xác thực JWT với refresh token. Hệ thống này cung cấp quản lý người dùng an toàn với các thực hành xác thực hiện đại bao gồm access token ngắn hạn và refresh token dài hạn để tối ưu hóa bảo mật và trải nghiệm người dùng.

### **What You've Built / Những gì bạn đã xây dựng:**

- ✅ Complete TypeScript backend with Express
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication with refresh token system
- ✅ User registration, login, and profile management
- ✅ Protected routes with middleware authentication
- ✅ Admin role-based access control
- ✅ Comprehensive error handling
- ✅ Production-ready security practices

**Happy Coding! 🚀** / _Chúc bạn code vui vẻ! 🚀_

---

_This guide is comprehensive and production-ready. Follow the steps carefully and you'll have a robust e-commerce backend system._

_Hướng dẫn này toàn diện và sẵn sàng cho sản xuất. Làm theo các bước cẩn thận và bạn sẽ có một hệ thống backend e-commerce mạnh mẽ._
