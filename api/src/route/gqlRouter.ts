import express from 'express';
import { getArticles } from './articlesRouter';
import { getUser, getUsers } from './usersRouter';

const gqlRouter = express.Router();

// GraphQLスキーマの定義
// export const typeDefs = `#graphql
//   type Book {
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book!]!
//     articles: [Article!]!
//     users: [User!]!
//     user(id:ID!): User!
//   }

//   type User {
//     id: ID!
//     name: String!
//     articles: [Article!]!
//   }

//   type Article {
//     id: ID!
//     title: String!
//     content: String!
//     author: User!
//   }
// `;
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import { Resolvers } from '../graphql';
export const schema = loadSchemaSync(join(__dirname, '../../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

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
export const resolvers: Resolvers = {
  Query: {
    books: () => books,
    articles: () => getArticles(),
    users: getUsers,
    user: (parent: any, args: any, context: any, info: any) => {
      console.log(args);
      return getUser(args);
    },
  },
  User: {
    articles: (parent: { id: number }) => getArticles(parent.id),
  },
};

export default gqlRouter;
