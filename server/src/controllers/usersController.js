const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const Password = require('../services/Password');
const jwt = require('jsonwebtoken');
const generateTokens = require('../services/generateTokens');
const ServerError = require('../utils/ServerError');

exports.currentUser = (req, res, next) => {
  res.send({ currentUser: req.user });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res
      .status(400)
      .send([
        new ServerError(
          'Invalid Cradentials',
          494,
          'INVALID_CRADENTIALS'
        ).toJSON(),
      ]);

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch)
    return res
      .status(400)
      .send([
        new ServerError(
          'Invalid Cradentials',
          494,
          'INVALID_CRADENTIALS'
        ).toJSON(),
      ]);

  const { accessToken, refreshToken } = await generateTokens(existingUser.id);

  return res.send({ accessToken, refreshToken });
};

exports.signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    var user = new User({ userName, email, password });

    await user.save().catch((err) => console.log(err));

    const { accessToken, refreshToken } = await generateTokens(user.id);

    return res.status(201).send({ accessToken, refreshToken });
  } else {
    return res
      .status(400)
      .send([
        new ServerError('Email Already Exists', 495, 'EMAIL_EXISTS').toJSON(),
      ]);
  }
};

exports.refresh = async (req, res) => {
  const { oldRefreshToken } = req.body;
  const db_refreshToken = await RefreshToken.findOne({
    value: oldRefreshToken,
  });
  if (!db_refreshToken)
    throw new ServerError('Token not found', 404, 'TOKEN_NOT_FOUND');

  const user = db_refreshToken.user;

  try {
    jwt.verify(db_refreshToken.value, process.env.JWT_REFRESH_KEY);
  } catch (error) {
    throw new ServerError('Token expired', 410, 'TOKEN_EXPIRED');
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  res.status(201).send({ accessToken, refreshToken });
};

exports.signOut = async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.decode(token);
  if (decoded == null) return res.send('Token error');
  // delete user refresh token from db, client side will delete from localStorage
  const user = decoded.id;
  await RefreshToken.deleteOne({ user });
  return res.send({});
};
