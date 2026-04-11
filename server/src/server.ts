import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';



const typeDefs = `
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log(process.env.DATABASE_URL);


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);