import { Application } from 'express';
import { GraphQLSchema } from 'graphql';
import { Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

export interface ICreateSubscriptionServer {
  httpServer: Server;
  schema: GraphQLSchema;
}

export interface IStartApolloServer {
  app: Application;
  schema: GraphQLSchema;
  subscriptionServer: SubscriptionServer;
}

export interface IMessage {
  id: string;
  text: string;
  createdAt: number;
  availableAt: number;
}

export interface IMessageQueue extends Array<IMessage> {}
