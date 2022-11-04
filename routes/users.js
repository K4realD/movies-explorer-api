const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/users');
const { userValidator } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', userValidator, updateUser);

module.exports = router;
