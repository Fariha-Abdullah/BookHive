const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin123@cluster0.yhd1fzo.mongodb.net/book_store?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose;

