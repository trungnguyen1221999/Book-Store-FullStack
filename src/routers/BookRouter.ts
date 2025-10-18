import { Router } from "express";
import {
  createABook,
  deleteABook,
  editABook,
  getAllBooks,
  sortByPrice,
} from "../controllers/bookController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const routers = Router();

// PUBLIC ROUTES - Ai cũng có thể xem books
routers.get("/hello", (req, res) => {
  res.json({ message: "Hello from BookRouter!" });
});
routers.get("/sort", sortByPrice);
routers.get("/books", getAllBooks);

// ADMIN ONLY ROUTES - Chỉ admin mới được thêm/sửa/xóa books
routers.use(authenticateToken); // Require login
routers.use(requireAdmin); // Require admin role

routers.post("/add-book", createABook);
routers.put("/edit-book/:id", editABook);
routers.delete("/delete-book/:id", deleteABook);

export default routers;
