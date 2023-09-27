const express = require('express');
const router = express.Router();
const passCont = require('../controller/resetpassword');

router.post('/pass_reset', passCont.resetpass);

module.exports = router;