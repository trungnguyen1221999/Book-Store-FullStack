import { Router } from "express";
import {
  createABook,
  deleteABook,
  editABook,
  getAllBooks,
} from "../controllers/bookController.js";

const routers = Router();

routers.post("/add-book", createABook);

routers.get("/books", getAllBooks);

routers.put("/edit-book/:id", editABook);

routers.delete("/delete-book/:id", deleteABook);

export default routers;
