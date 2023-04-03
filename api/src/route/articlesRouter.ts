import express from 'express';
import { dataSource } from '../app';
import { ArticleDto } from '../dto/ArticleDto';
import ArticleModel from '../model/Article';
import UserModel from '../model/User';

const articlesRouter = express.Router();

export const getArticles = async (userId?: number) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const { manager } = dataSource;
  if (userId)
    return manager
      .getRepository(ArticleModel)
      .createQueryBuilder('article')
      .where('article.id = :id', { id: userId })
      .getMany();
  return dataSource.manager.find(ArticleModel);
};
articlesRouter.get('/articles', async (req, res) => {
  res.status(200).send(await getArticles());
});

articlesRouter.get('/articles/:id', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const article = await dataSource.manager.findOneBy(ArticleModel, {
    id: parseInt(req.params.id),
  });
  if (article == null) {
    res.status(404).send({ code: 404, message: 'Article not found' });
    return;
  }
  res.status(200).send(article);
});

articlesRouter.post('/articles', async (req, res) => {
  try {
    if (!dataSource.isInitialized) await dataSource.initialize();
    res
      .status(200)
      .send(
        await dataSource.manager.save(
          ArticleModel,
          articleMap(req.body, new ArticleModel())
        )
      );
  } catch (error) {
    console.error(error);
    res.status(400).send({ code: 404, message: 'Bad request' });
  }
});

articlesRouter.patch('/articles/:id', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  res
    .status(200)
    .send(
      await dataSource.manager.save(
        ArticleModel,
        articleMap(req.body, new ArticleModel(parseInt(req.params.id)))
      )
    );
});

function articleMap(req: ArticleDto, article: ArticleModel) {
  //idはマッピング対象外
  if (req.title) article.title = req.title;
  if (req.content) article.content = req.content;
  article.author = new UserModel(req.authorId);
  return article;
}

export default articlesRouter;
