import express from "express";
import { getArticle, getArticles, saveArticle } from "./articlesRouter";
import { getUser, getUsers, saveUser } from "./usersRouter";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { Resolvers } from "../../../common/graphql";

const gqlRouter = express.Router();
export const schema = loadSchemaSync(
  join(__dirname, "../../../common/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

// サンプルデータの定義
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// リゾルバーの定義
export const resolvers: Resolvers = {
  Query: {
    books: () => books,
    articles: () => getArticles(),
    article: (_, args) => getArticle(args.id),
    users: getUsers,
    user: (_, args) => getUser(args.id),
  },
  User: {
    articles: (parent) => getArticles(parent.id),
  },
  Mutation: {
    addUser: (_, args) => saveUser(args.name),
    addArticle: (_, args) => saveArticle(args),
  },
};

export default gqlRouter;
