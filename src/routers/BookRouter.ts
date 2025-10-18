import { Router } from "express";
import {
  createABook,
  deleteABook,
  editABook,
  getAllBooks,
  sortByPrice,
} from "../controllers/bookController.js";

const routers = Router();

// Test route first
routers.get("/hello", (req, res) => {
  res.json({ message: "Hello from BookRouter!" });
});

// Sort route
routers.get("/sort", sortByPrice);

routers.post("/add-book", createABook);
routers.get("/books", getAllBooks);
routers.put("/edit-book/:id", editABook);
routers.delete("/delete-book/:id", deleteABook);

export default routers;
