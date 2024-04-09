const express = require('express');

const expenseController = require('../controller/expense')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/add_expense', userauthentication.authenticate,  expenseController.insertExp );
router.get('/fetch_exp', userauthentication.authenticate,  expenseController.getAllExp );
router.delete('/del_exp/:id', userauthentication.authenticate,  expenseController.deleteExp );

router.post('/add_income', userauthentication.authenticate, expenseController.insertincome );
router.get('/fetch_income', userauthentication.authenticate,  expenseController.getAllInc );

module.exports = router;