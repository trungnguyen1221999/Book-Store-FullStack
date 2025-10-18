# 🛒 Laptop Shop E-commerce Backend

_Hệ thống Backend cho Cửa hàng Laptop E-commerce_

## 📋 Overview / Tổng quan

**English**: A comprehensive e-commerce backend system built with Node.js, TypeScript, and MongoDB for book retail business. Features include user authentication with JWT refresh tokens, product management, shopping cart, order processing, and admin dashboard.

**Tiếng Việt**: Hệ thống backend e-commerce toàn diện được xây dựng với Node.js, TypeScript và MongoDB cho việc kinh doanh book. Bao gồm các tính năng xác thực người dùng với JWT refresh token, quản lý sản phẩm, giỏ hàng, xử lý đơn hàng và bảng điều khiển admin.

## 🚀 Features / Tính năng

### 🔐 Authentication System / Hệ thống xác thực

- ✅ **User Registration & Login** / _Đăng ký & Đăng nhập_
- ✅ **JWT Access Tokens (15 minutes)** / _JWT Access Token (15 phút)_
- ✅ **Refresh Tokens (7 days)** / _Refresh Token (7 ngày)_
- ✅ **Secure Password Hashing** / _Mã hóa mật khẩu an toàn_
- ✅ **Role-based Access Control** / _Phân quyền theo vai trò_

### 👤 User Management / Quản lý người dùng

- ✅ **Profile Management** / _Quản lý hồ sơ_
- ✅ **Password Change** / _Đổi mật khẩu_
- ✅ **Account Deletion** / _Xóa tài khoản_
- ✅ **Admin User Management** / _Quản lý người dùng (Admin)_

### 📦 Product Management / Quản lý sản phẩm

- ✅ **Product CRUD Operations** / _Thao tác CRUD sản phẩm_
- ✅ **Category Management** / _Quản lý danh mục_
- ✅ **Product Search & Filtering** / _Tìm kiếm & lọc sản phẩm_

### 🛍️ Shopping Features / Tính năng mua sắm

- ✅ **Shopping Cart Management** / _Quản lý giỏ hàng_
- ✅ **Order Processing** / _Xử lý đơn hàng_
- ✅ **Order History** / _Lịch sử đơn hàng_

## 🛠️ Tech Stack / Công nghệ sử dụng

| Technology     | Purpose               | Mục đích             |
| -------------- | --------------------- | -------------------- |
| **Node.js**    | Runtime Environment   | Môi trường chạy      |
| **TypeScript** | Type Safety           | An toàn kiểu dữ liệu |
| **Express.js** | Web Framework         | Framework web        |
| **MongoDB**    | Database              | Cơ sở dữ liệu        |
| **Mongoose**   | ODM                   | Trình điều khiển DB  |
| **JWT**        | Authentication        | Xác thực             |
| **bcryptjs**   | Password Hashing      | Mã hóa mật khẩu      |
| **Cors**       | Cross-Origin Requests | Yêu cầu cross-origin |

## 📁 Project Structure / Cấu trúc dự án

```
src/
├── controllers/          # Route handlers / Xử lý route
│   ├── userController.ts     # User operations / Thao tác người dùng
│   ├── BookController.ts     # Product operations / Thao tác sản phẩm
│   ├── cartController.ts     # Cart operations / Thao tác giỏ hàng
│   ├── orderController.ts    # Order operations / Thao tác đơn hàng
│   └── categoryController.ts # Category operations / Thao tác danh mục
├── models/               # Database schemas / Schema cơ sở dữ liệu
│   ├── UserModel.ts          # User schema / Schema người dùng
│   ├── BookModel.ts          # Product schema / Schema sản phẩm
│   ├── CartModel.ts          # Cart schema / Schema giỏ hàng
│   ├── OrderModel.ts         # Order schema / Schema đơn hàng
│   └── CategoryModel.ts      # Category schema / Schema danh mục
├── routers/              # API routes / Route API
│   ├── userRouter.ts         # User routes / Route người dùng
│   ├── BookRouter.ts         # Product routes / Route sản phẩm
│   ├── cartRouter.ts         # Cart routes / Route giỏ hàng
│   ├── orderRouter.ts        # Order routes / Route đơn hàng
│   └── categoryRouter.ts     # Category routes / Route danh mục
├── middleware/           # Custom middleware / Middleware tùy chỉnh
│   └── authMiddleware.ts     # Authentication middleware / Middleware xác thực
├── utils/                # Utility functions / Hàm tiện ích
│   └── tokenUtils.ts         # JWT utilities / Tiện ích JWT
├── types/                # TypeScript types / Kiểu TypeScript
│   └── AuthRequest.ts        # Custom request types / Kiểu request tùy chỉnh
├── config/               # Configuration / Cấu hình
├── Database/             # Database connection / Kết nối cơ sở dữ liệu
└── server.ts             # Entry point / Điểm vào
```

## 🚀 Getting Started / Bắt đầu

### Prerequisites / Yêu cầu

- **Node.js** (v16 or higher) / _(phiên bản 16 trở lên)_
- **MongoDB** (Local or Cloud) / _(Local hoặc Cloud)_
- **npm** or **yarn** / _hoặc yarn_

### Installation / Cài đặt

1. **Clone the repository** / _Clone repository_

```bash
git clone https://github.com/trungnguyen1221999/Laptop-Shop-Ecommerce-FullStack.git
cd Laptop-Shop-Ecommerce-FullStack
```

2. **Install dependencies** / _Cài đặt dependencies_

```bash
npm install
```

3. **Setup environment variables** / _Thiết lập biến môi trường_
   Create `.env` file / _Tạo file `.env`_:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

4. **Build the project** / _Build dự án_

```bash
npm run build
```

5. **Start the server** / _Khởi chạy server_

```bash
# Development / Phát triển
npm run dev

# Production / Sản xuất
npm start
```

## 🔧 Available Scripts / Scripts có sẵn

| Command         | Description                    | Mô tả                             |
| --------------- | ------------------------------ | --------------------------------- |
| `npm run dev`   | Start development server       | Khởi chạy server phát triển       |
| `npm run build` | Build TypeScript to JavaScript | Build TypeScript thành JavaScript |
| `npm start`     | Start production server        | Khởi chạy server sản xuất         |
| `npm test`      | Run tests                      | Chạy tests                        |

## 🔐 Authentication Flow / Luồng xác thực

### English:

1. **Register/Login**: Client receives access token (15min) and refresh token (7 days)
2. **API Requests**: Include access token in Authorization header
3. **Token Refresh**: When access token expires, use refresh token to get new access token
4. **Logout**: Refresh token is removed from database

### Tiếng Việt:

1. **Đăng ký/Đăng nhập**: Client nhận access token (15 phút) và refresh token (7 ngày)
2. **Gọi API**: Đính kèm access token trong header Authorization
3. **Làm mới token**: Khi access token hết hạn, dùng refresh token để lấy access token mới
4. **Đăng xuất**: Refresh token được xóa khỏi database

## 🌐 API Endpoints / Điểm cuối API

### Authentication / Xác thực

- `POST /users/register` - Register user / _Đăng ký_
- `POST /users/login` - Login user / _Đăng nhập_
- `POST /users/refresh-token` - Refresh access token / _Làm mới token_
- `POST /users/logout` - Logout user / _Đăng xuất_

### User Management / Quản lý người dùng

- `GET /users/profile` - Get user profile / _Lấy hồ sơ_
- `PUT /users/profile` - Update profile / _Cập nhật hồ sơ_
- `PUT /users/change-password` - Change password / _Đổi mật khẩu_

For detailed API documentation, see [API_GUIDE.md](./API_GUIDE.md)
_Để xem tài liệu API chi tiết, xem [API_GUIDE.md](./API_GUIDE.md)_

## 🤝 Contributing / Đóng góp

### English:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Tiếng Việt:

1. Fork dự án
2. Tạo branch tính năng (`git checkout -b feature/TinhNangTuyetVoi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng tuyệt vời'`)
4. Push lên branch (`git push origin feature/TinhNangTuyetVoi`)
5. Mở Pull Request

## 📝 License / Giấy phép

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
_Dự án này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để biết chi tiết._

## 👨‍💻 Author / Tác giả

**Trung Nguyen** - _Backend Developer_

- GitHub: [@trungnguyen1221999](https://github.com/trungnguyen1221999)

## 🙏 Acknowledgments / Ghi nhận

- Express.js community for excellent documentation
- MongoDB team for robust database solution
- TypeScript team for type safety
- JWT.io for authentication standards

_Cảm ơn cộng đồng Express.js, MongoDB, TypeScript và JWT.io_

---



**Made  by Trung Nguyen** 