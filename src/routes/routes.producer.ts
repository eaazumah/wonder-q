import express from "express";

const router = express.Router();

router.post("/produce", (req, res) => {
  res.send(201);
});

router.post("/status", (req, res) => {
  res.send(200);
});

export default router;
