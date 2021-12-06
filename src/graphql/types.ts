import { gql } from 'apollo-server-express';

const typeDef = gql`
  type Message {
    id: ID!
    text: String!
    createdAt: Float!
    availableAt: Float!
  }

  type Query {
    hello: String
    status(id: ID!): Boolean!
    consume(limit: Int): [Message!]!
  }

  type Mutation {
    completed(id: ID!): Boolean!
    produce(text: String!): Message!
  }
`;

export default typeDef;
