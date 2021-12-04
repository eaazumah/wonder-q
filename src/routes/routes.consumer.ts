import express from "express";

const router = express.Router();

router.get("/consume", (req, res) => {
  res.send([]);
});

router.post("/notify", (req, res) => {
  res.send(200);
});

export default router;
