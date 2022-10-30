const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidator, movieIdValidator } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:_id', movieIdValidator, deleteMovie);

module.exports = router;
