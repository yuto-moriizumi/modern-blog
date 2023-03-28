import express from 'express';
import { dataSource } from '../app';
import { UserDto } from '../dto/UserDto';
import Article from '../model/Article';
import User from '../model/User';

const usersRouter = express.Router();

export const getUsers = async () => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  return dataSource.manager.find(User);
};
usersRouter.get('/users', async (req, res) => {
  res.status(200).send(await getUsers());
});

usersRouter.get('/users/:id', async (req, res) => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const user = await dataSource.manager.findOneBy(User, {
    id: parseInt(req.params.id),
  });
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
      .send(await dataSource.manager.save(User, userMap(req.body, new User())));
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
        User,
        userMap(req.body, new User(parseInt(req.params.id)))
      )
    );
});

function userMap(req: UserDto, user: User) {
  //idはマッピング対象外
  user.name = req.name;
  return user;
}

export default usersRouter;
