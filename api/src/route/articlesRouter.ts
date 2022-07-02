import express from 'express';
import { dataSource } from '../app';
import { ArticleDto } from '../dto/ArticleDto';
import Article from '../model/Article';
import User from '../model/User';

const articlesRouter = express.Router();

articlesRouter.get('/articles', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  res.status(200).send(await dataSource.manager.find(Article));
});

articlesRouter.get('/articles/:id', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const article = await dataSource.manager.findOneBy(Article, {
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
          Article,
          articleMap(req.body, new Article())
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
        Article,
        articleMap(req.body, new Article(parseInt(req.params.id)))
      )
    );
});

function articleMap(req: ArticleDto, article: Article) {
  //idはマッピング対象外
  article.title = req.title;
  article.content = req.content;
  article.author = new User(req.authorId);
  return article;
}

export default articlesRouter;
