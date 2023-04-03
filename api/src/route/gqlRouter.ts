import express from "express";
import { getArticles } from "./articlesRouter";
import { getUser, getUsers } from "./usersRouter";
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
    users: getUsers,
    user: (_parent, args) => getUser(args.id),
  },
  User: {
    articles: (parent: { id: number }) => getArticles(parent.id),
  },
};

export default gqlRouter;
