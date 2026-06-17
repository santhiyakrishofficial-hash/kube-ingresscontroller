const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// GET all activities (with optional skill filter)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.skill ? { skill: req.query.skill } : {};
    const activities = await Activity.find(filter).populate('skill');
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single activity
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('skill');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    const populated = await activity.populate('skill');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update activity
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('skill');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
