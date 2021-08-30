module.exports = (app) => {
  app.get('/api/users/currentuser', (req, res) => {
    res.status(200).send({});
  });
};
