import { Router, RequestHandler } from "express";
import {
  createACategory,
  getAllCategories,
  editACategory,
  deleteACategory,
} from "../controllers/categoryController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const categoryRouters = Router();

// PUBLIC ROUTES - Ai cũng có thể xem categories
categoryRouters.get("/hello", (req, res) => {
  res.json({ message: "Hello from CategoryRouter!" });
});
categoryRouters.get("/categories", getAllCategories);

// ADMIN ONLY ROUTES - Chỉ admin mới được thêm/sửa/xóa
categoryRouters.use(authenticateToken as RequestHandler); // Require login
categoryRouters.use(requireAdmin as RequestHandler); // Require admin role

categoryRouters.post("/add-category", createACategory);
categoryRouters.put("/edit-category/:id", editACategory);
categoryRouters.delete("/delete-category/:id", deleteACategory);

export default categoryRouters;
