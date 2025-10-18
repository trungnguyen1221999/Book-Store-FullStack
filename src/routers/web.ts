import { Router } from "express";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.send("Hello from the web router!");
});

// About route
router.get("/about", (req, res) => {
  res.send("About Us Page");
});

export default router;
