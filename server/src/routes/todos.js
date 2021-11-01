const { Router } = require('express');
const todosController = require('../controllers/todosController');

const authMiddleware = require('../middlewares/authMiddleware');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const todoValidationMiddleware = require('../middlewares/todoValidationMiddleware');
const errorsMiddleware = require('../middlewares/errorsMiddleware');

/** PUBLIC USER ROUTER */
const TodosRouter = Router();

/** PRIVATE USER ROUTER */
const PrivateTodosRouter = Router();
PrivateTodosRouter.use(authMiddleware);
PrivateTodosRouter.post(
  '/add',
  todoValidationMiddleware,
  errorsMiddleware,
  asyncMiddleware(todosController.add)
);
PrivateTodosRouter.get('/:uid', asyncMiddleware(todosController.fetchAllTodos));
PrivateTodosRouter.put('/update', asyncMiddleware(todosController.update));
PrivateTodosRouter.delete('/:tid', asyncMiddleware(todosController.delete));
TodosRouter.use(PrivateTodosRouter);

module.exports = TodosRouter;
