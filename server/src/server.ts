import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { brandTypeDefs } from './graphql/typedefs/brand.typedef.ts';
import { brandResolvers } from './graphql/resolvers/brand.resolver.ts';
import { perfumeTypeDefs } from './graphql/typedefs/parfume.typedef.ts';
import { perfumeResolvers } from './graphql/resolvers/parfume.resolver.ts';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge'

const typeDefs = mergeTypeDefs([
  brandTypeDefs,
  perfumeTypeDefs
])

const resolvers = mergeResolvers([
  brandResolvers,
  perfumeResolvers
])

const server = new ApolloServer({
  typeDefs,
  resolvers,
});




const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);