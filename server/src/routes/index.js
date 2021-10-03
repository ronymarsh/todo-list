const { Router } = require('express');
const UsersRouter = require('./users');

const AppRouter = Router();

AppRouter.use('/users', UsersRouter);

module.exports = AppRouter;
