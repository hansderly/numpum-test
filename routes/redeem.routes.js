const router = require('express').Router();

const {
	getAllRedeem,
	addRedeem,
	editRedeem,
	deleteRedeem,
} = require('../controllers');

router.get('/redeem', getAllRedeem);
router.post('/redeem', addRedeem);
router.post('/redeem/editRedeem', editRedeem);
router.post('/redeem/deleteRedeem', deleteRedeem);

module.exports = router;
