import Category from "../models/CategoryModel.js";
import { Request, Response } from "express";

const createACategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ message: "Categories fetched successfully", data: categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error });
  }
};

const editACategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const selectedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!selectedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({
        message: "Category updated successfully",
        data: selectedCategory,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error updating category", error });
  }
};

const deleteACategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const selectedCategory = await Category.findByIdAndDelete(id);
    if (!selectedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", error });
  }
};

export { createACategory, getAllCategories, editACategory, deleteACategory };
