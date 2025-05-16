// routes/signup.js
const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
        }

        // See if a user with this email already exists
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        } else {
            // Create a fresh user
            user = new UserModel({
                name,
                email,
                password: await bcrypt.hash(password, 10),
                isAdmin: false,
            });
            await user.save();
        }

        return res.status(200).json({ success: true, message: 'User created successfully.' });
    } catch (err) {
        console.error('Error in /api/signup:', err);
        return res.status(500).json({ success: false, message: 'Server error signing up user.' });
    }
});

module.exports = router;
