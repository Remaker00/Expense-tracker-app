const Expense = require('../models/expenses');
const Income = require('../models/income');

exports.insertincome = async (req, res) => {
    const { income } = req.body;
    console.log('income', req.body);
    const { name, _id: userId } = req.user;

    const newIncome = new Income({
        income,
        user: {
            name,
            userId,
        },
    });
    try {
        const savedIncome = await newIncome.save();

        return res.status(201).json({ income: savedIncome, success: true });
    } catch (err) {
        console.error('Err', err);
        return res.status(403).json({ success: false, error: err });
    }
};

exports.getAllInc = async (req, res) => {
    try {
        const income = await Income.find({ 'user.userId': req.user._id })

        res.status(200).json({ income });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses.');
    }
};

exports.insertExp = async (req, res) => {
    const { expense, description, category, card } = req.body;
    const { name, _id: userId } = req.user;

    const newExpense = new Expense({
        expense,
        description,
        category,
        card,
        user: {
            name,
            userId,
        },
    });
    try {
        const savedExpense = await newExpense.save();

        return res.status(201).json({ expense: savedExpense, success: true });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ success: false, error: err });
    }
};

exports.getAllExp = async (req, res) => {
    try {
        // const page = parseInt(req.query.page) || 1;
        // const perPage = 6;

        const expenses = await Expense.find({
            'user.userId': req.user._id
        })
        // .limit(perPage)
        // .skip((page - 1) * perPage);


        // const totalExpenses = await Expense.countDocuments({
        //     'user.userId': req.user._id,
        // });
        // const totalPages = Math.ceil(totalExpenses / perPage);

        res.status(200).json({
            expenses,
            // totalExpenses,
            // totalPages,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses.');
    }
};


exports.editExp = async (req, res) => {
    try {
        const expenseId  = req.params.id;
        const { expense, description, category, card } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            expense,
            description,
            category,
            card
        }); 

        if (!updatedExpense) {
            return res.status(404).json({ success: false, error: 'Expense not found' });
        }
        return res.status(200).json({ success: true, expense: updatedExpense });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


exports.deleteExp = async (req, res) => {
    const expenseId = req.params.id;
    try {
        if (!expenseId) {
            res.status(404).send('Expense not found.');
            return;
        }
        await Expense.findByIdAndRemove(expenseId);
        res.status(200).send('Expense deleted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting expense.');
    }
};
