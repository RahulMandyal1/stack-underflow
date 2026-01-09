const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const connectToDB = require('./db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');

connectToDB();

const app = express();

// Simple GET endpoint at root
app.get('/', (req, res) => {
  res.json({ message: 'Hello! Stack Underflow backend is working! 🚀' });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});
