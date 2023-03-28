import express from 'express';
import { getArticles } from './articlesRouter';

const gqlRouter = express.Router();

// GraphQLスキーマの定義
export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book!]!
    articles: [Article!]!
  }

  type User {
    id: ID!
    name: String!
    articles: [Article!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
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
    articles: getArticles,
  },
  User: {
    articles: (parent: { id: number }) => getArticles(parent.id),
  },
};

export default gqlRouter;
