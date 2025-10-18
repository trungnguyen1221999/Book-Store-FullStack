import { Router } from "express";

const testRouter = Router();

testRouter.get("/test-sort", (req, res) => {
  res.json({
    message: "Test sort route works!",
    query: req.query,
    timestamp: new Date(),
  });
});

export default testRouter;
