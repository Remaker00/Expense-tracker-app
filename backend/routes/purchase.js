const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchasecont');
const userauthentication = require('../middleware/auth');

router.get('/make_payment', userauthentication.authenticate,purchaseController.getpayment);
router.post('/update_payment', userauthentication.authenticate,purchaseController.updatepayment);

module.exports = router;