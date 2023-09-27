const User = require('../models/users');

exports.getpremium = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id
        });
        const userResponse = {
            premiumuser: user.ispremiumuser,
        };
        res.status(200).json(userResponse);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses.');
    }
};

