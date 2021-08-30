// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');

// App Variables
const app = express();
const PORT = process.env.PORT || consts.DEFAULT_PORT; //default port is 5000

// App Configuration
app.use(cors());

// Routes Definitions
app.get('/', (req, res) => {
  res.status(200).send('Todo List Server!');
});

// Server Activation
app.listen(PORT, () => {
  console.log('Server listening');
});
