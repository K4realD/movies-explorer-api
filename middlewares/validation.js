const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const url = (value, helpers) => (validator.isURL(value) ? value : helpers.message('Введенные данные не являются ссылкой'));

const langRU = (value, helpers) => (validator.isAlpha(value, ['ru-RU'], { ignore: ' -' }) ? value : helpers.message('Название должно быть на русском языке'));

const langEN = (value, helpers) => (validator.isAlpha(value, ['en-US'], { ignore: ' -' }) ? value : helpers.message('Название должно быть на английском языке'));

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().positive().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(url),
    trailerLink: Joi.string().required().custom(url),
    thumbnail: Joi.string().required().custom(url),
    movieId: Joi.number().positive().required(),
    nameRU: Joi.string().required().custom(langRU),
    nameEN: Joi.string().required().custom(langEN),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const registrationValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userValidator,
  movieIdValidator,
  movieValidator,
  registrationValidator,
  authValidator,
};
