import { GraphQLSchema } from "graphql";
import { Server } from "http";

export interface ICreateSubscriptionServer {
  httpServer: Server;
  schema: GraphQLSchema;
}
