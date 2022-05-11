const router = require('express').Router();
const axios = require('axios');
const { nanoid } = require('nanoid');
const admin = require('../admin');
const { getTranfer, postTransfer } = require('../controllers');
const { firebase } = require('../firebase');

router.get('/transfer', getTranfer);
router.post('/transfer', postTransfer);

module.exports = router;
