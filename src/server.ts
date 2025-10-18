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

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes first
app.use("/api", routers);
app.use("/api/category", categoryRouters);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
