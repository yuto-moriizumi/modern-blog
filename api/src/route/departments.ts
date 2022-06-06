import express from 'express';
import { dataSource } from '../app';
import Article from '../model/Article';

const departmentsRouter = express.Router();

departmentsRouter.get('/departments', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  res.status(200).send(await dataSource.manager.find(Article));
});

export default departmentsRouter;
