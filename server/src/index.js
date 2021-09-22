// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const AppRouter = require('./routes');
const path = require('path');

// App Variables

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || consts.DEFAULT_PORT; //default port is 5000

// App Configuration
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./models/User');
mongoose.connect(keys.MONGO_URI);

// Routes Definitions
app.use('/api', AppRouter);

if (keys.IS_PROD) {
  //static serve of React app
  const buildDir = path.join(__dirname, '..', '..', 'build');
  app.use(express.static(buildDir)); //   ../../build
  console.log('serving static files from ', buildDir);

  app.use('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
  });
}

// Server Activation
app.listen(PORT, () => {
  console.log('Server listening');
});
