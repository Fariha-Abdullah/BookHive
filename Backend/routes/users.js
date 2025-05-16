const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user by ID with lovedBooks populated
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('lovedBooks');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// PUT update user by ID
// routes/userRoutes.js
// PUT /api/users/:id
// PUT /api/users/:id
router.put('/users/:id', async (req, res) => {
    const { bookId } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const alreadyLoved = user.lovedBooks.includes(bookId);

        let updatedUser;
        if (alreadyLoved) {
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $pull: { lovedBooks: bookId } }, // Remove from array
                { new: true }
            ).populate('lovedBooks');
        } else {
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { lovedBooks: bookId } }, // Add to array
                { new: true }
            ).populate('lovedBooks');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});




module.exports = router;
