import { Router } from "express";
import {
  createACategory,
  getAllCategories,
  editACategory,
  deleteACategory
} from "../controllers/categoryController.js";


const categoryRouters = Router();

// Test route first
categoryRouters.get("/hello", (req, res) => {
  res.json({ message: "Hello from CategoryRouter!" });
});

// Sort route

categoryRouters.post("/add-category", createACategory);
categoryRouters.get("/categories", getAllCategories);
categoryRouters.put("/edit-category/:id", editACategory);
categoryRouters.delete("/delete-category/:id", deleteACategory);

export default categoryRouters;
