const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

/** PUBLIC USER ROUTER */
const UsersRouter = Router();
UsersRouter.post('/signin', asyncMiddleware(usersController.signIn));
UsersRouter.post(
  '/signup',
  [
    body('userName')
      .custom((value) => !/\s/.test(value))
      .withMessage('User name must not contain spaces'),
    body('email').trim().isEmail().withMessage('Email not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 chars long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    next();
  },
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
