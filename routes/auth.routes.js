const router = require('express').Router();

const {
	getLogin,
	login,
	getRegister,
	register,
	logout,
} = require('../controllers');

router.get('/login', getLogin);
router.post('/login', login);
router.get('/register', getRegister);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
