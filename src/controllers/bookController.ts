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
    const sortOrder = isAscending ? -1 : 1; // asc = 1 (tăng dần), desc = -1 (giảm dần)

    const SortBooks = await Book.find().sort({ newPrice: sortOrder });

    const sortType = isAscending ? "ascending" : "descending";
    return res.status(200).json({
      message: `Books sorted by price in ${sortType} order`,
      data: SortBooks,
    });
  } catch (error) {
    console.error("Sort error:", error); // Add logging to debug
    return res.status(500).json({
      message: "Error sorting books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const sortBySold = async (req: Request, res: Response) => {
  try {
    // Mặc định: bán chạy nhất trước (descending)
    const isAscending = "asc" in req.query;
    const sortOrder = isAscending ? 1 : -1; // desc = -1 (mặc định), asc = 1
    const sortBooks = await Book.find().sort({ sold: sortOrder });
    const sortType = isAscending
      ? "ascending (least sold first)"
      : "descending (bestsellers first)";
    return res.status(200).json({
      message: `Books sorted by sold in ${sortType}`,
      data: sortBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error sorting books by sold",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// COMBINED FILTER + SORT for Frontend
const getFilteredAndSortedBooks = async (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      sort = "sold", // Ngắn gọn hơn: sort thay vì sortBy
      order = "desc", // Ngắn gọn hơn: order thay vì sortOrder
      min,
      max,
    } = req.query;

    // Build filter object
    const filter: any = {};

    // Filter by category
    if (categoryId) {
      filter.categoryId = categoryId;
    }

    // Filter by price range
    if (min || max) {
      filter.newPrice = {};
      if (min) filter.newPrice.$gte = Number(min);
      if (max) filter.newPrice.$lte = Number(max);
    }

    // KHÔNG filter trending nữa - chỉ sort thôi

    // Build sort object
    const sortObj: any = {};

    if (sort === "price") {
      sortObj.newPrice = order === "asc" ? 1 : -1;
    } else if (sort === "sold") {
      sortObj.sold = order === "asc" ? 1 : -1;
    } else if (sort === "trending") {
      // Trending products first (true = 1, false = 0)
      sortObj.trending = order === "asc" ? 1 : -1;
    } else if (sort === "name") {
      sortObj.title = order === "asc" ? 1 : -1;
    } else {
      // Default: sort by sold descending (bestsellers)
      sortObj.sold = -1;
    } // Execute query with filter and sort
    const books = await Book.find(filter)
      .populate("categoryId", "name") // Populate category name
      .sort(sortObj);

    const message = `Books filtered and sorted successfully`;

    return res.status(200).json({
      message,
      filters: {
        categoryId: categoryId || "all",
        priceRange: { min: min || "none", max: max || "none" },
        sort: sort,
        order: order,
      },
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error filtering and sorting books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  createABook,
  getAllBooks,
  editABook,
  deleteABook,
  sortByPrice,
  sortBySold,
  getFilteredAndSortedBooks,
};
