import { ApolloServer } from '@apollo/server';
import express from 'express';

const gqlRouter = express.Router();

// GraphQLスキーマの定義
export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book!]!
  }
`;

// サンプルデータの定義
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// リゾルバーの定義
export const resolvers = {
  Query: {
    books: () => books,
  },
};

export default gqlRouter;
