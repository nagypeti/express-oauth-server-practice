const express = require('express');
const router = express.Router();
const oAuthCtrl = require('../controllers/oAuthCtrl');

router.get('/', oAuthCtrl.index);
router.post('/auth', oAuthCtrl.authenticate);
router.post('/token', oAuthCtrl.getTokenPair);

module.exports = router;
