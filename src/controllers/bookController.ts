import Book from "../models/BookModel.js";
import { Request, Response } from "express";

const createABook = async (req: Request, res: Response) => {
  try {
    const newBook = await Book.create(req.body);
    res
      .status(201)
      .json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const allBooks = await Book.find();
    return res
      .status(200)
      .json({ message: "Books fetched successfully", data: allBooks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error });
  }
};

const editABook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const selectedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!selectedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: selectedBook });
  } catch (error) {
    return res.status(500).json({ message: "Error editing book", error });
  }
};

const deleteABook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const selectedBook = await Book.findByIdAndDelete(id);
    if (!selectedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error });
  }
};
export { createABook, getAllBooks, editABook, deleteABook };
