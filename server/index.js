const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kids-skills';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const skillRoutes = require('./routes/skills');
const activityRoutes = require('./routes/activities');
const childRoutes = require('./routes/children');

app.use('/api/skills', skillRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/children', childRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Kids Skills API is running!' });
});

app.listen(PORT, () => {
  console.log(`🎮 Server running on port ${PORT}`);
});
