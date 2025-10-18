import { Request, Response } from "express";
import User from "../models/UserModel";
const createNewUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        if (!newUser.email) return res.status(400).json({ message: "Email is required" });
        const isExistingUser = await User.findOne({ email: newUser.email });
        if (isExistingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        return res.status(201).json({ message: "User created successfully", data: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }   
};


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Users retrieved successfully", data: users });
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving users", error });
    }
};

const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", data: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;  
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
};

export { createNewUser, getAllUsers, editUser, deleteUser };