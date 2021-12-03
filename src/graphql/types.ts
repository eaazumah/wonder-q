import { gql } from "apollo-server-express";

const typeDef = gql`
  type Query {
    _empty: String
    hello: String
  }

  type Subscription {
    _empty: String
  }
`;

export default typeDef;
