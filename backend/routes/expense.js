const express = require('express');

const expenseController = require('../controller/expense')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/', userauthentication.authenticate,  expenseController.insertExp );
router.get('/fetch_exp', userauthentication.authenticate,  expenseController.getAllExp );
router.delete('/del_exp/:id', userauthentication.authenticate,  expenseController.deleteExp );

module.exports = router;