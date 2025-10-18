import { Router } from "express";
import {
  createABook,
  deleteABook,
  editABook,
  getAllBooks,
  sortByPrice,
} from "../controllers/bookController.js";

const routers = Router();

routers.post("/add-book", createABook);

// Sort route - put before /books to avoid conflicts
routers.get("/sort", sortByPrice);

routers.get("/books", getAllBooks);

routers.put("/edit-book/:id", editABook);

routers.delete("/delete-book/:id", deleteABook);


export default routers;
