const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, _, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production'
      ? JWT_SECRET
      : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
