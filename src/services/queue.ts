import { nanoid } from "nanoid";
import PQueue from "p-queue";
import { IMessageQueue } from "../@types/deceleration";

let availabilityPeriod = 60000;
let messageQueue: IMessageQueue = [];

const concurrencyQueue = new PQueue({ concurrency: 1 });

const afterMilliseconds = (ms: number = 30000) => {
  const now = new Date();
  now.setMilliseconds(now.getMilliseconds() + ms);
  return now.getTime();
};

/***
 * consume(read) a message to from messageQueue
 */
const consume = (count: number = 10) => {
  //filter  available messages using availableAt time stamp
  let availableMessages = messageQueue.filter((message) => {
    return message.availableAt <= Date.now();
  });

  if (count < availableMessages.length) {
    const start = availableMessages.length - count;
    availableMessages = availableMessages.splice(start, count);
  }

  const availableMessagesIds = availableMessages.map((message) => message.id);

  // update message visibility with availabilityPeriod
  messageQueue = messageQueue.map((message) => {
    if (availableMessagesIds.includes(message.id)) {
      return {
        ...message,
        availableAt: afterMilliseconds(availabilityPeriod),
      };
    }
    return message;
  });

  return availableMessages;
};

/***
 * consume(read) concurrently a message to from messageQueue
 * concurrency is set to 1: one consume(read) at a time
 */
const consumeConcurrently = (count?: number) => {
  return concurrencyQueue.add(() => consume(count));
};

/***
 * produce(create or add) a message to from messageQueue
 */
const produce = (text: string) => {
  const message = {
    text,
    id: nanoid(),
    createdAt: Date.now(),
    availableAt: Date.now(),
  };
  messageQueue = [message, ...messageQueue];
};

/***
 * deleteMessage a message by id from messageQueue
 */
const deleteMessage = (id: string) => {
  messageQueue = messageQueue.filter((message) => {
    return message.id !== id;
  });
};

/***
 * clearMessages from messageQueue
 */
const clearMessages = () => {
  messageQueue = [];
};

/***
 * setAvailabilityPeriod for message
 */
const setAvailabilityPeriod = (ms: number) => {
  availabilityPeriod = ms;
};

const getAllMessage = () => {
  return messageQueue;
};

export {
  produce,
  consume,
  clearMessages,
  getAllMessage,
  deleteMessage,
  consumeConcurrently,
  setAvailabilityPeriod,
};
