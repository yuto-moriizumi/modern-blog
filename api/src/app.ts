import Express from 'express';
import compression from 'compression';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import usersRouter from './route/usersRouter';
import articlesRouter from './route/articlesRouter';
import cors from 'cors';
import 'reflect-metadata';
import User from './model/User';
import Article from './model/Article';
import { resolvers, typeDefs } from './route/gqlRouter';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';

// envファイルの読み込み
dotenv.config();

const app = Express();

// apiルータへ
app.use('/', usersRouter);
app.use('/', articlesRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Modern blog Express API Server!');
});

// DB設定
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'modern_blog',
  entities: [User, Article],
  synchronize: true,
  logging: false,
});
dataSource.initialize().catch((error) => console.log(error));

// サーバーのセットアップ
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// ミドルウェア設定
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL })); //add multiple cors
app.use(Express.json()); //json用ミドルウェア
app.use(Express.urlencoded({ extended: true })); //フォームデータ用ミドルウェア
app.use(compression()); // gzip圧縮して返す

(async () => {
  await server.start();
  app.use('/gql', expressMiddleware(server));
  httpServer.listen({ port: 4000 });
})();

module.exports = app;
export default app;
