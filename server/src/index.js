// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');
const bodyParser = require('body-parser');
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

require('./models/User');
mongoose.connect(keys.MONGO_URI);

// Routes Definitions
app.use('/api', AppRouter);

console.log(keys.IS_PROD, keys.NODE_ENV, process.env.NODE_ENV);

if (keys.IS_PROD) {
  //static serve of React app
  const buildDir = path.join(__dirname, '..', '..', 'client', 'public');
  app.use(express.static(buildDir)); //   ../../client/public
  console.log('serveing static files from ', buildDir);
  app.use('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
  });
}

// Server Activation
app.listen(PORT, () => {
  console.log('Server listening');
});
