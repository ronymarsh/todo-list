module.exports = (app) => {
  app.get('/api/users/signout', (req, res) => {
    res.status(200).send({});
  });
};
