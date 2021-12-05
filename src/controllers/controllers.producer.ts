import { Request, Response } from "express";
import * as queue from "../services/queue";

const produce = (req: Request, res: Response) => {
  const { text } = req.body;
  const message = queue.produce(text);
  res.status(201).send(message);
};

const status = (req: Request, res: Response) => {
  const id = req.params.id;

  const messages = queue.getAllMessage();

  const ids = messages.map((message) => message.id);

  const isInQueue = ids.includes(id);

  if (isInQueue) {
    return res.status(200).send({
      completed: false,
    });
  }

  return res.status(200).send({
    completed: false,
  });
};

const ProducerController = {
  status,
  produce,
};

export default ProducerController;
