# 📚 Complete E-commerce Backend Development Guide

_Hướng dẫn phát triển Backend E-commerce hoàn chỉnh_

## 🎯 Project Overview / Tổng quan dự án

**English**: This is a comprehensive guide to building a complete e-commerce backend system for book retail business using modern technologies and best practices.

**Tiếng Việt**: Đây là hướng dẫn toàn diện để xây dựng hệ thống backend e-commerce hoàn chỉnh cho kinh doanh book sử dụng các công nghệ và thực hành hiện đại.

### 🏗️ **Architecture / Kiến trúc**

- **Pattern**: MVC (Model-View-Controller)
- **API Style**: RESTful API
- **Authentication**: JWT with Refresh Token
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript for type safety

### 🛠️ **Tech Stack / Công nghệ sử dụng**

| Technology               | Purpose          | Mục đích                |
| ------------------------ | ---------------- | ----------------------- |
| **Node.js + TypeScript** | Backend Runtime  | Môi trường chạy backend |
| **Express.js**           | Web Framework    | Framework web           |
| **MongoDB + Mongoose**   | Database & ODM   | Cơ sở dữ liệu & ODM     |
| **JWT**                  | Authentication   | Xác thực người dùng     |
| **bcryptjs**             | Password Hashing | Mã hóa mật khẩu         |

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
    "declarationMap": true,
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

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/laptop-shop
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop-shop

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

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
│   ├── 📁 config/                  # Configuration files / File cấu hình
│   │   └── 📄 database.ts
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
│   │   ├── 📄 tokenUtils.ts        # JWT utilities / Tiện ích JWT
│   │   ├── 📄 validation.ts        # Input validation / Xác thực đầu vào
│   │   └── 📄 emailService.ts      # Email utilities / Tiện ích email
│   ├── 📁 types/                   # TypeScript types / Kiểu TypeScript
│   │   ├── 📄 AuthRequest.ts       # Custom request types / Kiểu request tùy chỉnh
│   │   └── 📄 index.ts             # Type exports / Export kiểu
│   ├── 📁 services/                # External services / Dịch vụ bên ngoài
│   │   ├── 📄 paymentService.ts    # Payment integration / Tích hợp thanh toán
│   │   └── 📄 uploadService.ts     # File upload / Upload file
│   └── 📄 server.ts                # Entry point / Điểm vào
├── 📁 dist/                        # Compiled JavaScript / JavaScript đã compile
├── 📄 .env                         # Environment variables / Biến môi trường
├── 📄 .gitignore                   # Git ignore rules / Quy tắc Git ignore
├── 📄 package.json                 # Dependencies / Dependencies
├── 📄 tsconfig.json               # TypeScript config / Cấu hình TypeScript
├── 📄 README.md                   # Project documentation / Tài liệu dự án
└── 📄 API_GUIDE.md               # API documentation / Tài liệu API
```

### **Create Directory Structure / Tạo cấu trúc thư mục**

```bash
# Create all directories at once / Tạo tất cả thư mục cùng lúc
mkdir -p src/{config,Database,models,controllers,routers,middleware,utils,types,services}
```

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

    // Log database name / Ghi log tên database
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

### **3.2 Environment Configuration / Cấu hình môi trường**

**English**: Ensure your `.env` file contains all necessary environment variables
**Tiếng Việt**: Đảm bảo file `.env` của bạn chứa tất cả biến môi trường cần thiết

```env
# Server Configuration / Cấu hình server
PORT=5000
NODE_ENV=development

# MongoDB Configuration / Cấu hình MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop-shop

# JWT Configuration / Cấu hình JWT
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-at-least-32-characters

# Optional: OAuth Configuration / Tùy chọn: Cấu hình OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
SESSION_SECRET=your-session-secret
```

**⚠️ Security Note / Lưu ý bảo mật**:

- **English**: Never commit `.env` file to version control. Add it to `.gitignore`
- **Tiếng Việt**: Không bao giờ commit file `.env` lên version control. Thêm vào `.gitignore`

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
  refreshToken?: string; // For JWT refresh token / Cho JWT refresh token
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
      select: false, // Don't return password by default / Không trả về password mặc định
    },
    refreshToken: {
      type: String,
      select: false, // Don't return refresh token by default / Không trả về refresh token mặc định
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[0-9+\-\s()]{8,15}$/,
        "Please enter a valid phone number / Vui lòng nhập số điện thoại hợp lệ",
      ],
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
    // ... các field khác
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
```

### **4.2 Authentication Middleware (middleware/authMiddleware.ts)**

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest.js";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access token is required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admin role required." });
    return;
  }

  next();
};
```

### **4.3 User Controller (controllers/userController.ts)**

```typescript
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Kiểm tra user đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo user mới
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Tìm user và include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error: error instanceof Error ? error.message : error,
    });
  }
};
```

---

## 📚 **BƯỚC 5: HỆ THỐNG QUẢN LÝ SẢN PHẨM**

### **5.1 Category Model (models/CategoryModel.ts)**

```typescript
import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  isActive: boolean;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
```

### **5.2 Book Model (models/BookModel.ts)**

```typescript
import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  originalPrice: number;
  newPrice: number;
  quantity: number;
  sold: number;
  images: string[];
  categoryId: mongoose.Schema.Types.ObjectId;
  trending: boolean;
  isActive: boolean;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Price cannot be negative"],
    },
    newPrice: {
      type: Number,
      required: [true, "New price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, "Sold quantity cannot be negative"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    trending: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
```

### **5.3 Advanced Filter API (controllers/bookController.ts)**

```typescript
// COMBINED FILTER API - Lọc và sắp xếp sản phẩm
export const getFilteredBooks = async (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      trending,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 12,
      search,
    } = req.query;

    // Build filter object
    const filter: any = { isActive: true };

    // Category filter
    if (category) {
      filter.categoryId = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.newPrice = {};
      if (minPrice) filter.newPrice.$gte = Number(minPrice);
      if (maxPrice) filter.newPrice.$lte = Number(maxPrice);
    }

    // Trending filter
    if (trending !== undefined) {
      filter.trending = trending === "true";
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    const sort: any = {};
    const validSortFields = [
      "newPrice",
      "sold",
      "trending",
      "title",
      "createdAt",
    ];

    if (validSortFields.includes(sortBy as string)) {
      sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const books = await Book.find(filter)
      .populate({
        path: "categoryId",
        select: "name",
      })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      message: "Books retrieved successfully",
      data: {
        books,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalBooks: total,
          hasNext: skip + books.length < total,
        },
        filters: {
          category,
          minPrice,
          maxPrice,
          trending,
          search,
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books",
      error: error instanceof Error ? error.message : error,
    });
  }
};
```

---

## 🛒 **BƯỚC 6: HỆ THỐNG GIỎ HÀNG**

### **6.1 Cart Model (models/CartModel.ts)**

```typescript
import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  bookId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  priceAtTime: number;
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

const CartItemSchema = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
    min: 0,
  },
});

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
```

### **6.2 Cart Controller Functions**

```typescript
// ADD TO CART
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId, quantity = 1 } = req.body;

    // Kiểm tra sách có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Kiểm tra quantity có đủ không
    if (quantity > book.quantity) {
      return res.status(400).json({
        message: `Only ${book.quantity} items available in stock`,
      });
    }

    // Tìm hoặc tạo cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Kiểm tra item đã có trong cart chưa
    const existingItemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItemIndex > -1) {
      // Update quantity nếu đã có
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (newQuantity > book.quantity) {
        return res.status(400).json({
          message: `Cannot add ${quantity} more items. Only ${book.quantity} available in stock`,
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Thêm item mới
      cart.items.push({
        bookId: bookId,
        quantity: quantity,
        priceAtTime: book.newPrice,
      });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding item to cart",
      error: error instanceof Error ? error.message : error,
    });
  }
};
```

---

## 📦 **BƯỚC 7: HỆ THỐNG ĐẶT HÀNG**

### **7.1 Order Model (models/OrderModel.ts)**

```typescript
export interface IOrderItem {
  bookId: mongoose.Schema.Types.ObjectId;
  title: string;
  author: string;
  quantity: number;
  priceAtTime: number;
  image: string;
}

export interface ICustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPING = "shipping",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  customerInfo: ICustomerInfo;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
  notes?: string;
  adminNotes?: string;
  orderDate: Date;
  deliveryDate?: Date;
}

// Auto generate order number
OrderSchema.pre("save", function (next) {
  if (this.isNew) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.orderNumber = `ORD${timestamp}${random}`;
  }
  next();
});
```

### **7.2 Checkout Process (controllers/orderController.ts)**

```typescript
// CREATE ORDER - Checkout từ cart
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      customerInfo,
      paymentMethod,
      notes,
      shippingFee = 30000,
    } = req.body;

    // Validate customer info
    if (!customerInfo || !customerInfo.fullName || !customerInfo.phone) {
      return res.status(400).json({
        message: "Customer information is required",
      });
    }

    // Lấy cart của user
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.bookId",
      select: "title author newPrice images quantity",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Kiểm tra stock và prepare order items
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cart.items) {
      const book = cartItem.bookId as any;

      // Kiểm tra stock
      if (cartItem.quantity > book.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${book.title}`,
        });
      }

      // Prepare order item
      const orderItem = {
        bookId: book._id,
        title: book.title,
        author: book.author,
        quantity: cartItem.quantity,
        priceAtTime: cartItem.priceAtTime,
        image: book.images && book.images.length > 0 ? book.images[0] : "",
      };

      orderItems.push(orderItem);
      totalAmount += cartItem.quantity * cartItem.priceAtTime;

      // Update stock
      book.quantity -= cartItem.quantity;
      book.sold += cartItem.quantity;
      await book.save();
    }

    const finalAmount = totalAmount + shippingFee;

    // Tạo order
    const order = await Order.create({
      userId,
      items: orderItems,
      customerInfo,
      paymentMethod,
      totalAmount,
      shippingFee,
      finalAmount,
      notes: notes || "",
    });

    // Clear cart sau khi checkout thành công
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating order",
      error: error instanceof Error ? error.message : error,
    });
  }
};
```

---

## 🛣️ **BƯỚC 8: THIẾT LẬP ROUTES**

### **8.1 Server Entry Point (server.ts)**

```typescript
import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./Database/ConnectMongoDB.js";
import routers from "./routers/BookRouter.js";
import categoryRouters from "./routers/categoryRouter.js";
import userRouter from "./routers/userRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

// Connect to MongoDB
connectMongoDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routers); // Books & Filter
app.use("/api/category", categoryRouters);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### **8.2 User Routes (routers/userRouter.ts)**

```typescript
import express from "express";
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", register);
userRouter.post("/login", login);

// Protected routes
userRouter.use(authenticateToken);
userRouter.get("/profile", getUserProfile);
userRouter.put("/profile", updateUserProfile);

// Admin only routes
userRouter.get("/all", requireAdmin, getAllUsers);

export default userRouter;
```

---

## 🎯 **BƯỚC 9: TỔNG KẾT API ENDPOINTS**

### **👤 User APIs:**

```
POST   /api/users/register        # Đăng ký
POST   /api/users/login          # Đăng nhập
GET    /api/users/profile        # Xem profile (Auth)
PUT    /api/users/profile        # Cập nhật profile (Auth)
GET    /api/users/all            # Xem tất cả users (Admin)
```

### **📚 Book APIs:**

```
GET    /api/books                # Lấy danh sách sách
GET    /api/books/:id            # Chi tiết sách
POST   /api/books                # Thêm sách (Admin)
PUT    /api/books/:id            # Cập nhật sách (Admin)
DELETE /api/books/:id            # Xóa sách (Admin)
GET    /api/filter               # Filter & Sort sách
```

### **🏷️ Category APIs:**

```
GET    /api/category             # Lấy danh sách danh mục
POST   /api/category             # Thêm danh mục (Admin)
PUT    /api/category/:id         # Cập nhật danh mục (Admin)
DELETE /api/category/:id         # Xóa danh mục (Admin)
```

### **🛒 Cart APIs:**

```
GET    /api/cart                 # Xem giỏ hàng (Auth)
POST   /api/cart/add             # Thêm vào giỏ (Auth)
PUT    /api/cart/update/:bookId  # Cập nhật số lượng (Auth)
DELETE /api/cart/remove/:bookId  # Xóa sản phẩm (Auth)
DELETE /api/cart/clear           # Xóa toàn bộ giỏ (Auth)
```

### **📦 Order APIs:**

```
POST   /api/orders               # Checkout (Auth)
GET    /api/orders               # Lịch sử đơn hàng (Auth)
GET    /api/orders/:id           # Chi tiết đơn hàng (Auth)
PUT    /api/orders/:id/cancel    # Hủy đơn hàng (Auth)
GET    /api/orders/admin/all     # Xem tất cả đơn (Admin)
PUT    /api/orders/admin/:id/status # Cập nhật trạng thái (Admin)
```

---

## ✨ **BƯỚC 10: TÍNH NĂNG NỔI BẬT**

### **🔐 Bảo mật:**

- JWT Authentication với refresh token
- Password hashing với bcrypt (salt 12)
- Role-based access control (Customer/Admin)
- Input validation và sanitization

### **🎛️ Quản lý sản phẩm:**

- Advanced filtering (category, price range, trending)
- Multiple sorting options (price, popularity, date)
- Pagination cho performance tối ưu
- Search theo title và author

### **🛒 Giỏ hàng thông minh:**

- Real-time stock checking
- Price protection (lưu giá tại thời điểm thêm)
- Automatic cart cleanup sau checkout
- Quantity validation

### **📦 Đơn hàng hoàn chỉnh:**

- Auto generate order number unique
- Multiple payment methods support
- Order status tracking system
- Inventory management tự động
- Admin order management

### **⚡ Performance:**

- MongoDB indexes cho query tối ưu
- Populate selective fields
- Efficient pagination
- Error handling toàn diện

---

## 🚀 **BƯỚC 11: KHỞI CHẠY DỰ ÁN**

### **11.1 Development Mode:**

```bash
npm run dev
```

### **11.2 Production Build:**

```bash
npm run build
npm start
```

### **11.3 Testing APIs:**

Sử dụng Thunder Client, Postman hoặc curl để test các endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Get filtered books
curl "http://localhost:5000/api/filter?category=123&minPrice=100&maxPrice=500&sortBy=price&sortOrder=asc"
```

---

## 🎉 **KẾT LUẬN**

E-commerce Backend hoàn chỉnh với:

✅ **Authentication System** - Đăng ký/Đăng nhập với JWT  
✅ **User Management** - Profile, role-based access  
✅ **Product Management** - CRUD, advanced filtering  
✅ **Category System** - Phân loại sản phẩm  
✅ **Shopping Cart** - Giỏ hàng thông minh  
✅ **Order System** - Checkout và quản lý đơn hàng  
✅ **Admin Panel** - Quản trị toàn diện



---
