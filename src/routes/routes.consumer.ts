import express from "express";
import ConsumerController from "../controllers/controllers.consumer";

const router = express.Router();

router.get("/consume/", ConsumerController.consume);

router.delete("/completed/:id", ConsumerController.completed);

export default router;
