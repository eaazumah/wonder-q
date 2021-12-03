import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { Application } from "express";
import { GraphQLSchema } from "graphql";
import depthLimit from "graphql-depth-limit";
import { SubscriptionServer } from "subscriptions-transport-ws";

const createContext = async ({ _, __, connection }: any) => {
  if (connection) {
    return {
      ...connection.context,
    };
  }

  return {};
};

export const createApolloServer = (config: ApolloServerExpressConfig) => {
  const server = new ApolloServer({
    ...config,
  });
  return server;
};

const startApolloServer = async ({
  app,
  schema,
  subscriptionServer,
}: {
  app: Application;
  schema: GraphQLSchema;
  subscriptionServer: SubscriptionServer;
}) => {
  const plugins = [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ];

  const server = createApolloServer({
    schema,
    plugins,
    introspection: true,
    context: createContext,
    validationRules: [depthLimit(6)],
  });

  await server.start();

  server.applyMiddleware({ app });

  return server;
};

export default startApolloServer;
