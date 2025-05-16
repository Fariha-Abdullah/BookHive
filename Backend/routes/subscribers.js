const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

router.get('/subscribers', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Error fetching subscriptions' });
    }
});

module.exports = router;