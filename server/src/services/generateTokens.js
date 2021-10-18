const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');

const generateTokens = async (user) => {
  // Generate an access token valid for 1 minute
  const accessToken = jwt.sign(
    {
      id: user,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: '60s',
    }
  );

  // Generate a refresh token valid for 30 days or until logout
  const refreshToken = jwt.sign(
    {
      id: user,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: '30 days',
    }
  );

  const value = refreshToken;
  // delete old refresh token before saving new one
  await RefreshToken.deleteOne({ user });
  // create object
  const refreshTokenObj = new RefreshToken({ user, value });
  // save the new refreshToken in db for token tracking
  await refreshTokenObj.save().catch((err) => console.log(err));

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
