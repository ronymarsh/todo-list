// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');
const bodyParser = require('body-parser');

// App Variables
const app = express();
const PORT = process.env.PORT || consts.DEFAULT_PORT; //default port is 5000

// App Configuration
app.use(cors());
app.use(bodyParser.json());

require('./routes/signup')(app);
require('./routes/signin')(app);
require('./routes/signout')(app);
require('./routes/currentuser')(app);

// Routes Definitions
app.get('/', (req, res) => {
  res.status(200).send('Todo List Server!');
});

// Server Activation
app.listen(PORT, () => {
  console.log('Server listening');
});
