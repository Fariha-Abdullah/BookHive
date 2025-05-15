const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const jwt = require('jsonwebtoken'); // Add this line



// Admin login route
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      success: true,
      token,
      message: 'Admin login successful'
    });
    // req.session.isAdmin = true;
    // res.json({ message: 'Admin login successful' });
    
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new verify route
router.get('/admin/verify', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// In your admin.js routes file
router.post('/admin/create-admin', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'Labib' });
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Admin Labib already exists!',
        solution: 'Remove this endpoint or use different credentials'
      });
    }

    const hashedPassword = await bcrypt.hash('labib123', 10);
    const admin = new Admin({
      username: 'Labib',
      password: hashedPassword
    });

    await admin.save();
    res.json({ 
      success: true,
      message: 'Labib admin created successfully'
    });
  } catch (error) {
    console.error('Admin Creation Error:', error);
    res.status(500).json({
      error: 'Admin creation failed',
      details: error.message
    });
  }
});


module.exports = router;