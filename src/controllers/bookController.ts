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

const sortByPrice = async (req: Request, res: Response) => {
  try {
    // Check if 'asc' exists in query, otherwise default to 'desc'
    const isAscending = "asc" in req.query;
    const sortOrder = isAscending ? 1 : -1; // asc = 1 (tăng dần), desc = -1 (giảm dần)

    const SortBooks = await Book.find().sort({ newPrice: sortOrder });

    const sortType = isAscending ? "ascending" : "descending";
    return res.status(200).json({
      message: `Books sorted by price in ${sortType} order`,
      data: SortBooks,
    });
  } catch (error) {
    console.error("Sort error:", error); // Add logging to debug
    return res
      .status(500)
      .json({
        message: "Error sorting books",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export { createABook, getAllBooks, editABook, deleteABook, sortByPrice };
