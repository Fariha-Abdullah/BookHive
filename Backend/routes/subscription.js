const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const moment = require('moment');

// Helper to pick days per plan
const getPlanDurationDays = (plan) => {
  switch (plan) {
    case 'premium':
      return 365;
    case 'basic':
    default:
      return 30;
  }
};

router.post('/subscribe', async (req, res) => {
  const { email, subscriptionPlan } = req.body;
  const durationDays = getPlanDurationDays(subscriptionPlan);
  const now = moment();
  const newEndDate = now.clone().add(durationDays, 'days').toDate();

  try {
    // find existing
    let subscription = await Subscription.findOne({ userId: email });

    if (subscription) {
      // update
      subscription.subscriptionPlan = subscriptionPlan;
      subscription.startDate = now.toDate();
      subscription.endDate = newEndDate;
      subscription.isActive = true;
      await subscription.save();
      return res
        .status(200)
        .json({ message: 'Subscription updated', subscription });
    }

    // create new
    subscription = new Subscription({
      userId: email,
      subscriptionPlan,
      startDate: now.toDate(),
      endDate: newEndDate,
      isActive: true
    });
    await subscription.save();

    return res
      .status(200)
      .json({ message: 'Subscription successful', subscription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Subscription error' });
  }
});

router.get('/status/:email', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.email });
    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    // recalc active
    const now = moment();
    const isCurrentlyActive = now.isBefore(subscription.endDate);
    if (subscription.isActive !== isCurrentlyActive) {
      subscription.isActive = isCurrentlyActive;
      await subscription.save();
    }

    // days remaining floored at 0
    const diffMs = subscription.endDate - now.toDate();
    const rawDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const daysRemaining = rawDays > 0 ? rawDays : 0;

    return res.json({
      plan: subscription.subscriptionPlan,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      isActive: isCurrentlyActive,
      daysRemaining
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking subscription' });
  }
});

module.exports = router;
