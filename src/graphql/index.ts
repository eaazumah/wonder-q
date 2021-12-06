import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import typeDefs from './types';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
