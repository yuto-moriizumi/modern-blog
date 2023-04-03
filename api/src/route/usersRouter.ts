import express from 'express';
import { dataSource } from '../app';
import { UserDto } from '../dto/UserDto';
import ArticleModel from '../model/Article';
import UserModel from '../model/User';

const usersRouter = express.Router();

export const getUsers = async () => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  return dataSource.manager.find(UserModel);
};
usersRouter.get('/users', async (req, res) => {
  res.status(200).send(await getUsers());
});

export const getUser = async (id: number) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  console.log({ id });
  return dataSource.manager.findOneBy(UserModel, {
    id,
  });
};
usersRouter.get('/users/:id', async (req, res) => {
  const user = await getUser(parseInt(req.params.id));
  if (user == null) {
    res.status(404).send({ code: 404, message: 'User not found' });
    return;
  }
  res.status(200).send(user);
});

usersRouter.post('/users', async (req, res) => {
  try {
    if (!dataSource.isInitialized) await dataSource.initialize();
    res
      .status(200)
      .send(
        await dataSource.manager.save(
          UserModel,
          userMap(req.body, new UserModel())
        )
      );
  } catch (error) {
    console.error(error);
    res.status(400).send({ code: 404, message: 'Bad request' });
  }
});

usersRouter.patch('/users/:id', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  res
    .status(200)
    .send(
      await dataSource.manager.save(
        UserModel,
        userMap(req.body, new UserModel(parseInt(req.params.id)))
      )
    );
});

function userMap(req: UserDto, user: UserModel) {
  //idはマッピング対象外
  if (req.name) user.name = req.name;
  return user;
}

export default usersRouter;
