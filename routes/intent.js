const express = require('express');
const router = express.Router();
const intentCtrl = require('../controllers/intentCtrl');

router.post('/', intentCtrl.index);

module.exports = router;
