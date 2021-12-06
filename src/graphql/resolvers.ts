import {
  MutationCompletedArgs,
  MutationProduceArgs,
  QueryConsumeArgs,
  QueryStatusArgs
} from '../../@types/schema';
import * as queue from '../services/services.queue';

const hello = () => 'Hello world!';

const status = (_: any, args: QueryStatusArgs) => {
  const { id } = args;

  const messages = queue.getAllMessage();

  const ids = messages.map(message => message.id);

  const isInQueue = ids.includes(id);

  if (isInQueue) return false;

  return true;
};

const consume = (_: any, args: QueryConsumeArgs) => {
  const limit = args.limit || 10;
  return queue.consumeConcurrently(limit);
};

const produce = (_: any, args: MutationProduceArgs) => {
  const { text } = args;
  return queue.produce(text);
};

const completed = (_: any, args: MutationCompletedArgs) => {
  const { id } = args;
  queue.deleteMessage(id);
  return true;
};

const resolvers = {
  Query: {
    hello,
    status,
    consume
  },
  Mutation: {
    produce,
    completed
  }
};

export default resolvers;
