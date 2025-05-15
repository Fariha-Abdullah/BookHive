const mongoose = require('mongoose');
const moment = require('moment');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true // Ensure one subscription per user
  },
  subscriptionPlan: {
    type: String,
    required: true,
    enum: ['basic', 'premium'] // Only allow these plans
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Change in the pre-save hook
subscriptionSchema.pre('save', function (next) {
  if (!this.endDate) {

    this.endDate = moment(this.startDate).add(2, 'minutes').toDate();
    this.isActive = moment().isBefore(this.endDate);

  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;