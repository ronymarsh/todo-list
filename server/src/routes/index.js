const { Router } = require('express');
const UsersRouter = require('./users');
const TodosRouter = require('./todos');

const AppRouter = Router();

AppRouter.use('/users', UsersRouter);
AppRouter.use('/todos', TodosRouter);

module.exports = AppRouter;
