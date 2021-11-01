const { Todo } = require('../models/Todo');
const ServerError = require('../utils/ServerError');

exports.add = async (req, res) => {
  const { title, due_date } = req.body;
  const todo = new Todo({ title, due_date, user: req.user.id });
  try {
    await todo.save();
  } catch (err) {
    req.errors.push(
      new ServerError('Invalid Date', 420, 'INVALID_DATE').toJSON()
    );
    return res.status(400).send(req.errors);
  }
  res.send(todo);
};

exports.fetchAllTodos = async (req, res) => {
  const user = req.params.uid;
  const todos = await Todo.find({ user });
  console.log(todos);
  res.send(todos);
};

exports.update = async (req, res) => {
  const update = req.body;
  const filter = req.body._id;
  const todo = await Todo.findOneAndReplace(filter, update, {
    new: true,
  });
  res.send(todo);
};

exports.delete = async (req, res) => {
  const _id = req.params.tid;
  await Todo.deleteOne({ _id });
  res.send({});
};
