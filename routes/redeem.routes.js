const router = require('express').Router();
const redeem = require('../controllers/redeemControllers');
const upload = require('../utils/multer');
const { cloudinary } = require('../utils/cloudinary');
const admin = require('../admin');
const { firebase } = require('../firebase');
const { nanoid } = require('nanoid');
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
