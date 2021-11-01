const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const errorsMiddleware = require('../middlewares/errorsMiddleware');

/** PUBLIC USER ROUTER */
const UsersRouter = Router();
UsersRouter.post('/signin', asyncMiddleware(usersController.signIn));
UsersRouter.post(
  '/signup',
  validationMiddleware,
  errorsMiddleware,
  asyncMiddleware(usersController.signUp)
);
UsersRouter.post('/refresh', asyncMiddleware(usersController.refresh));
UsersRouter.post('/signout', asyncMiddleware(usersController.signOut));
/** PRIVATE USER ROUTER */
const PrivateUsersRouter = Router();
PrivateUsersRouter.use(authMiddleware);
PrivateUsersRouter.get('/currentuser', usersController.currentUser);
UsersRouter.use(PrivateUsersRouter);

module.exports = UsersRouter;
