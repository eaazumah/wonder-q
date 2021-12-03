import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ICreateSubscriptionServer } from "../@types/deceleration";
import { createApolloServer } from "./apollo.server";

const onConnect = () => {};

const createSubscriptionServer = (config: ICreateSubscriptionServer) => {
  const { schema, httpServer } = config;

  const server = createApolloServer({
    schema,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  return subscriptionServer;
};

export default createSubscriptionServer;
