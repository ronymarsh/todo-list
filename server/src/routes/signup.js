module.exports = (app) => {
  app.post('/api/users/signup', (req, res) => {
    res.status(201).send(req.body);
  });
};
