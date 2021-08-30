module.exports = (app) => {
  app.post('/api/users/signin', (req, res) => {
    res.status(200).send(req.body);
  });
};
