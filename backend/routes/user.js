const express = require('express');
const router = express.Router();

const adminCont = require('../controller/user');
const userauthentication = require('../middleware/auth')

router.post('/signup', adminCont.insertusers);
router.post('/login', adminCont.checkusers);
router.get('/check-premium', userauthentication.authenticate, adminCont.checkpremium);


module.exports = router;