import { Request, Response } from 'express';
import * as queue from '../services/services.queue';

const consume = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  try {
    const messages = await queue.consumeConcurrently(limit);
    res.send(messages);
  } catch (error) {
    res.status(500).send({
      error: 'Internal server error'
    });
  }
};

const completed = (req: Request, res: Response) => {
  const { id } = req.params;
  queue.deleteMessage(id);
  res.status(204).send();
};

const ConsumerController = {
  consume,
  completed
};

export default ConsumerController;
