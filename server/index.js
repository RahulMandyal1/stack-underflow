const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');

connectToDB();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://stack-underflow-frontend.onrender.com',
    'https://stack-underflow-frontend.onrender.com/'
  ],
  credentials: true
}));

// Simple GET endpoint at root
app.get('/', (req, res) => {
  res.json({ message: 'Hello! Stack Underflow backend is working! 🚀' });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  cors: {
    origin: [
      'http://localhost:3000',
      'https://stack-underflow-frontend.onrender.com'
    ],
    credentials: true
  }
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});
