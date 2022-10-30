const error = (err, _, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = error;
