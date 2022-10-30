const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { registrationValidator, authValidator } = require('../middlewares/validation');
const { login, signout, createUser } = require('../controllers/users');

router.post('/signin', authValidator, login);
router.post('/signup', registrationValidator, createUser);
router.get('/signout', signout);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
