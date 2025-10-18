# 🚀 API Guide for Frontend Integration

_Hướng dẫn tích hợp API cho Frontend_

## 🔗 Base URL

```
http://localhost:5000
```

## 📖 Table of Contents / Mục lục

1. [Authentication APIs / API Xác thực](#authentication-apis--api-xác-thực)
2. [User Management APIs / API Quản lý người dùng](#user-management-apis--api-quản-lý-người-dùng)
3. [Product APIs / API Sản phẩm](#product-apis--api-sản-phẩm)
4. [Cart APIs / API Giỏ hàng](#cart-apis--api-giỏ-hàng)
5. [Order APIs / API Đơn hàng](#order-apis--api-đơn-hàng)
6. [Category APIs / API Danh mục](#category-apis--api-danh-mục)
7. [Error Handling / Xử lý lỗi](#error-handling--xử-lý-lỗi)
8. [Frontend Examples / Ví dụ Frontend](#frontend-examples--ví-dụ-frontend)

---

## 🔐 Authentication APIs / API Xác thực

### 1. Register User / Đăng ký người dùng

**Endpoint**: `POST /users/register`

**Request Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Response Success (201)**:

```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7a8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer",
    "isEmailVerified": false
  }
}
```

### 2. Login User / Đăng nhập

**Endpoint**: `POST /users/login`

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response Success (200)**:

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7a8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 3. Refresh Access Token / Làm mới Access Token

**Endpoint**: `POST /users/refresh-token`

**Request Body**:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Success (200)**:

```json
{
  "message": "Access token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Logout / Đăng xuất

**Endpoint**: `POST /users/logout`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Response Success (200)**:

```json
{
  "message": "Logout successful"
}
```

---

## 👤 User Management APIs / API Quản lý người dùng

### 1. Get User Profile / Lấy thông tin người dùng

**Endpoint**: `GET /users/profile`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Response Success (200)**:

```json
{
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7a8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }
}
```

### 2. Update User Profile / Cập nhật thông tin người dùng

**Endpoint**: `PUT /users/profile`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+0987654321",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

**Response Success (200)**:

```json
{
  "message": "Profile updated successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7a8",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+0987654321"
  }
}
```

### 3. Change Password / Đổi mật khẩu

**Endpoint**: `PUT /users/change-password`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response Success (200)**:

```json
{
  "message": "Password changed successfully"
}
```

---

## 📦 Product APIs / API Sản phẩm

### 1. Get All Products / Lấy tất cả sản phẩm

**Endpoint**: `GET /books`

**Query Parameters**:

- `page` (optional): Page number / _Số trang_
- `limit` (optional): Items per page / _Số item mỗi trang_
- `search` (optional): Search term / _Từ khóa tìm kiếm_
- `category` (optional): Category filter / _Lọc theo danh mục_

**Example**:

```
GET /books?page=1&limit=10&search=laptop&category=gaming
```

**Response Success (200)**:

```json
{
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "64f8d4e5c8f3a2b1e4d6c7a9",
      "title": "Gaming Laptop XYZ",
      "description": "High-performance gaming laptop",
      "price": 1299.99,
      "category": "gaming",
      "brand": "TechBrand",
      "stock": 15,
      "images": ["image1.jpg", "image2.jpg"],
      "specifications": {
        "processor": "Intel i7",
        "ram": "16GB",
        "storage": "512GB SSD"
      }
    }
  ],
  "pagination": {
    "current": 1,
    "total": 5,
    "count": 50
  }
}
```

### 2. Get Product by ID / Lấy sản phẩm theo ID

**Endpoint**: `GET /books/:id`

**Response Success (200)**:

```json
{
  "message": "Product retrieved successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7a9",
    "title": "Gaming Laptop XYZ",
    "description": "High-performance gaming laptop with latest specs",
    "price": 1299.99,
    "category": "gaming",
    "brand": "TechBrand",
    "stock": 15,
    "images": ["image1.jpg", "image2.jpg"],
    "specifications": {
      "processor": "Intel i7",
      "ram": "16GB",
      "storage": "512GB SSD",
      "graphics": "NVIDIA RTX 3070"
    }
  }
}
```

---

## 🛍️ Cart APIs / API Giỏ hàng

### 1. Get User Cart / Lấy giỏ hàng người dùng

**Endpoint**: `GET /cart`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Response Success (200)**:

```json
{
  "message": "Cart retrieved successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7b0",
    "userId": "64f8d4e5c8f3a2b1e4d6c7a8",
    "items": [
      {
        "productId": {
          "_id": "64f8d4e5c8f3a2b1e4d6c7a9",
          "title": "Gaming Laptop XYZ",
          "price": 1299.99,
          "images": ["image1.jpg"]
        },
        "quantity": 2,
        "price": 1299.99
      }
    ],
    "totalAmount": 2599.98
  }
}
```

### 2. Add Item to Cart / Thêm sản phẩm vào giỏ

**Endpoint**: `POST /cart/add`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "productId": "64f8d4e5c8f3a2b1e4d6c7a9",
  "quantity": 1
}
```

**Response Success (200)**:

```json
{
  "message": "Item added to cart successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7b0",
    "totalAmount": 1299.99,
    "itemCount": 1
  }
}
```

### 3. Update Cart Item / Cập nhật sản phẩm trong giỏ

**Endpoint**: `PUT /cart/update/:productId`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "quantity": 3
}
```

### 4. Remove Item from Cart / Xóa sản phẩm khỏi giỏ

**Endpoint**: `DELETE /cart/remove/:productId`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Response Success (200)**:

```json
{
  "message": "Item removed from cart successfully"
}
```

---

## 📋 Order APIs / API Đơn hàng

### 1. Create Order / Tạo đơn hàng

**Endpoint**: `POST /orders`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "items": [
    {
      "productId": "64f8d4e5c8f3a2b1e4d6c7a9",
      "quantity": 1,
      "price": 1299.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Response Success (201)**:

```json
{
  "message": "Order created successfully",
  "data": {
    "_id": "64f8d4e5c8f3a2b1e4d6c7b1",
    "orderNumber": "ORD-2024-001",
    "status": "pending",
    "totalAmount": 1299.99,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Get User Orders / Lấy đơn hàng của người dùng

**Endpoint**: `GET /orders`

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Response Success (200)**:

```json
{
  "message": "Orders retrieved successfully",
  "data": [
    {
      "_id": "64f8d4e5c8f3a2b1e4d6c7b1",
      "orderNumber": "ORD-2024-001",
      "status": "delivered",
      "totalAmount": 1299.99,
      "createdAt": "2024-01-15T10:30:00Z",
      "items": [
        {
          "productId": {
            "title": "Gaming Laptop XYZ",
            "images": ["image1.jpg"]
          },
          "quantity": 1,
          "price": 1299.99
        }
      ]
    }
  ]
}
```

---

## 🏷️ Category APIs / API Danh mục

### 1. Get All Categories / Lấy tất cả danh mục

**Endpoint**: `GET /categories`

**Response Success (200)**:

```json
{
  "message": "Categories retrieved successfully",
  "data": [
    {
      "_id": "64f8d4e5c8f3a2b1e4d6c7b2",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops",
      "description": "High-performance laptops for gaming"
    },
    {
      "_id": "64f8d4e5c8f3a2b1e4d6c7b3",
      "name": "Business Laptops",
      "slug": "business-laptops",
      "description": "Professional laptops for business use"
    }
  ]
}
```

---

## ❌ Error Handling / Xử lý lỗi

### Common Error Responses / Phản hồi lỗi thường gặp

#### 400 - Bad Request

```json
{
  "message": "Validation error",
  "error": "Email and password are required"
}
```

#### 401 - Unauthorized

```json
{
  "message": "Access denied",
  "error": "Invalid or expired token"
}
```

#### 403 - Forbidden

```json
{
  "message": "Access denied",
  "error": "Admin access required"
}
```

#### 404 - Not Found

```json
{
  "message": "Resource not found",
  "error": "User not found"
}
```

#### 409 - Conflict

```json
{
  "message": "User with this email already exists"
}
```

#### 500 - Internal Server Error

```json
{
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

---

## 💻 Frontend Examples / Ví dụ Frontend

### JavaScript/TypeScript with Axios

#### 1. Setup Axios Instance / Thiết lập Axios Instance

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

// Token management / Quản lý token
let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

// Request interceptor / Interceptor request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor for token refresh / Interceptor response để refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && refreshToken) {
      try {
        const response = await axios.post(
          "http://localhost:5000/users/refresh-token",
          {
            refreshToken,
          }
        );

        accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Retry original request / Thử lại request gốc
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        // Redirect to login / Chuyển hướng đến trang đăng nhập
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

#### 2. Authentication Functions / Hàm xác thực

```javascript
// Register user / Đăng ký người dùng
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);

    // Save tokens / Lưu token
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user / Đăng nhập người dùng
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);

    // Save tokens / Lưu token
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout user / Đăng xuất người dùng
export const logoutUser = async () => {
  try {
    await api.post("/users/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear tokens / Xóa token
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};
```

#### 3. Product Functions / Hàm sản phẩm

```javascript
// Get products / Lấy sản phẩm
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("/books", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get product by ID / Lấy sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
```

#### 4. Cart Functions / Hàm giỏ hàng

```javascript
// Get cart / Lấy giỏ hàng
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add to cart / Thêm vào giỏ hàng
export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update cart item / Cập nhật sản phẩm trong giỏ
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put(`/cart/update/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Remove from cart / Xóa khỏi giỏ hàng
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
```

### React Hook Examples / Ví dụ React Hook

#### Custom Authentication Hook

```javascript
import { useState, useEffect, createContext, useContext } from "react";
import { loginUser, logoutUser, registerUser } from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in / Kiểm tra người dùng đã đăng nhập
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Validate token and get user info
      // Xác thực token và lấy thông tin người dùng
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
```

### Vue.js Example / Ví dụ Vue.js

```javascript
// stores/auth.js (Pinia)
import { defineStore } from "pinia";
import { loginUser, logoutUser } from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await loginUser(credentials);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      await logoutUser();
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
```

---

## 🔧 Best Practices / Thực hành tốt nhất

### English:

1. **Always handle token refresh automatically** in your HTTP client
2. **Store tokens securely** - consider using httpOnly cookies for production
3. **Implement proper error handling** for all API calls
4. **Use loading states** for better user experience
5. **Validate data** before sending requests
6. **Implement retry logic** for failed requests
7. **Use environment variables** for API URLs

### Tiếng Việt:

1. **Luôn xử lý refresh token tự động** trong HTTP client
2. **Lưu trữ token an toàn** - cân nhắc dùng httpOnly cookies cho production
3. **Triển khai xử lý lỗi đúng cách** cho tất cả API calls
4. **Sử dụng loading states** để cải thiện trải nghiệm người dùng
5. **Xác thực dữ liệu** trước khi gửi request
6. **Triển khai retry logic** cho các request thất bại
7. **Sử dụng biến môi trường** cho API URLs

---

## 📞 Support / Hỗ trợ

For any questions about API integration, please create an issue in the repository or contact the development team.

_Để được hỗ trợ về tích hợp API, vui lòng tạo issue trong repository hoặc liên hệ team phát triển._

**Happy Coding! 🚀** / _Chúc bạn code vui vẻ! 🚀_
