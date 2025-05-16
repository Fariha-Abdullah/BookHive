// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    lovedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
