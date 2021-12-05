import { Request, Response } from "express";
import * as queue from "../services/queue";

const consume = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  try {
    const messages = await queue.consumeConcurrently(limit);
    res.send(messages);
  } catch (error) {
    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

const completed = (req: Request, res: Response) => {
  const id = req.params.id;
  queue.deleteMessage(id);
  res.status(200).send();
};

const ConsumerController = {
  consume,
  completed,
};

export default ConsumerController;
