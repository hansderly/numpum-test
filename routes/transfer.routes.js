const router = require('express').Router();
const { getTranfer, postTransfer } = require('../controllers');

router.get('/transfer', getTranfer);
router.post('/transfer', postTransfer);

module.exports = router;
