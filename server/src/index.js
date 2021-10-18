// Required External Modules
const express = require('express');
const cors = require('cors');
const consts = require('./consts');
const { json } = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const AppRouter = require('./routes');
const path = require('path');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/User');
dotenv.config();
// App Variables

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || consts.DEFAULT_PORT; //default port is 5000

// App Configuration
// verify callback for passport to use when calling passport.authenticate() in future requests
app.use(passport.initialize());
passport.use(
  new BearerStrategy(async function (accessToken, done) {
    try {
      var _id = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY).id;
      var user = await User.findOne({ _id });
      // safety net, if verify succeeded but no such user in db?
      if (!user) return done(null, false);
    } catch (err) {
      return done(err);
    }
    return done(null, user);
  })
);

app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use(
  cookieSession({
    signed: false,
  })
);

require('./models/RefreshToken');
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
