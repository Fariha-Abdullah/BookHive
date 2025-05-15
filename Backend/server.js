require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./routes/subscription');
const checkSubscriptionRoutes = require('./routes/check-subscription');
const bookmarkRoutes = require('./routes/bookmark');
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');
const usersRoutes = require('./routes/users');
const booksRoutes = require('./routes/books');
const subscribersRoutes = require('./routes/subscribers');
const session = require('express-session'); // NEW: Added session support
const bcrypt = require('bcryptjs');
const adminRoutes = require('./routes/admin'); // NEW: Added admin routes
const db = require('./utils/db');



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'your-strong-secret-key', // Use 32+ character string
  resave: false,
  saveUninitialized: false, // Changed from true
  cookie: {
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


// Routes
app.use('/api', adminRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', checkSubscriptionRoutes);
app.use('/api', signupRoutes);
app.use('/api', signinRoutes);
app.use('/api', subscribersRoutes);
app.use('/api', usersRoutes);
app.use('/api', booksRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use(express.json());
// NEW: Added admin routes


app.get('/', (req, res) => {
  res.send(
    '<div style="display:flex;height:90vh;justify-content:center;align-items:center;font-family: system-ui;"><h1>Book-Server</h1></div>',
  );
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  //db();
    console.log(`Server running on port ${PORT}`);
});
