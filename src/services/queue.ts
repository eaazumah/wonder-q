import { nanoid } from "nanoid";
import PQueue from "p-queue";
import { IMessageQueue } from "../@types/deceleration";

let messageQueue: IMessageQueue = [];

const concurrencyQueue = new PQueue({ concurrency: 1 });

const afterSeconds = (seconds: number = 30) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + seconds);
  return now.getTime();
};

const consume = (limit: number = 10) => {
  const availableMessages = messageQueue.filter((message) => {
    return message.availableAt < Date.now();
  });

  const availableMessagesIds = availableMessages.map((message) => message.id);

  // update message visibility
  messageQueue = messageQueue.map((message) => {
    if (availableMessagesIds.includes(message.id)) {
      return {
        ...message,
        availableAt: afterSeconds(),
      };
    }
    return message;
  });

  return availableMessages;
};

const consumeConcurrently = (limit?: number) => {
  return concurrencyQueue.add(() => consume(limit));
};

const produce = (text: string) => {
  const message = {
    text,
    id: nanoid(),
    createAt: Date.now(),
    availableAt: Date.now(),
  };
  messageQueue = [message, ...messageQueue];
};

const deleteMessage = (id: string) => {
  messageQueue = messageQueue.filter((message) => {
    return message.id !== id;
  });
};

export { produce, consume, consumeConcurrently, deleteMessage, messageQueue };
