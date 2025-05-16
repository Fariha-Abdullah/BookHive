// routes/signin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const router = express.Router();

// POST /api/signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1) Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        // 2) Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // 4) Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // 5) Create JWT payload
        const payload = {
            sub: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };

        // 6) Sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        // 7) Send response
        return res
            .status(200)
            .json({
                success: true,
                message: 'Signed in successfully.',
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
    } catch (err) {
        console.error('Error in /api/signin:', err);
        return res.status(500).json({ success: false, message: 'Server error signing in user.' });
    }
});

module.exports = router;
