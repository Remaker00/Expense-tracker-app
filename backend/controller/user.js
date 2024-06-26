const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.insertusers = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashpass = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashpass });
        res.status(201).send('User SignedIn successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Signing user.');
    }
};

exports.checkusers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id }, 'your4secret4key');

                res.status(200).json({ message: `Login successful`, token });
            } else {
                res.status(401).send('Invalid credentials.');
            }
        } else {
            res.status(401).send('Invalid credentials.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Logging user.');
    }
};



exports.checkpremium = async (req, res) => {
    // const { name, _id: userId } = req.user;
    try {
        console.log('User',req.user._id)
        console.log('user2',req.user);
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the response with the premium user status
        res.status(200).json({ ispremiumuser: user.ispremiumuser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};