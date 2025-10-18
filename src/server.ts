import express from "express";
import router from "./routers/web.js";
import dotenv from "dotenv";
import connectMongoDB from "./Database/ConnectMongoDB.js";
import routers from "./routers/BookRouter.js";

dotenv.config();

// Connect to MongoDB
connectMongoDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routers);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
