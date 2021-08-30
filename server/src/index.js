// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App Variables

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || consts.DEFAULT_PORT; //default port is 5000

// App Configuration
app.use(cors());
app.use(bodyParser.json());

require('./models/User');
mongoose.connect(
  'mongodb+srv://dbUser:vmxtjo19@cluster0.owme0.mongodb.net/TODO_LIST_DEV?retryWrites=true&w=majority'
);

// Routes Definitions
require('./routes/signup')(app);
require('./routes/signin')(app);
require('./routes/signout')(app);
require('./routes/currentuser')(app);

// Server Activation
app.listen(PORT, () => {
  console.log('Server listening');
});
