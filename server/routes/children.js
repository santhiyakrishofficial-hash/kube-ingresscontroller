const express = require('express');
const router = express.Router();
const Child = require('../models/Child');

// GET all children (leaderboard)
router.get('/', async (req, res) => {
  try {
    const children = await Child.find()
      .populate('progress.skill')
      .sort({ totalPoints: -1 });
    res.json(children);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single child
router.get('/:id', async (req, res) => {
  try {
    const child = await Child.findById(req.params.id).populate('progress.skill');
    if (!child) return res.status(404).json({ error: 'Child not found' });
    res.json(child);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create child
router.post('/', async (req, res) => {
  try {
    const child = new Child(req.body);
    await child.save();
    res.status(201).json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update child (add points, update progress)
router.put('/:id', async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('progress.skill');
    if (!child) return res.status(404).json({ error: 'Child not found' });
    res.json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST complete activity for child
router.post('/:id/complete-activity', async (req, res) => {
  try {
    const { skillId, points } = req.body;
    const child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ error: 'Child not found' });

    // Update total points
    child.totalPoints += points || 10;

    // Update skill progress
    const progressEntry = child.progress.find(
      (p) => p.skill.toString() === skillId
    );

    if (progressEntry) {
      progressEntry.xp += points || 10;
      progressEntry.activitiesCompleted += 1;
      // Level up every 100 XP
      if (progressEntry.xp >= progressEntry.level * 100) {
        progressEntry.level += 1;
        child.badges.push(`Level ${progressEntry.level} 🌟`);
      }
    } else {
      child.progress.push({
        skill: skillId,
        level: 1,
        xp: points || 10,
        activitiesCompleted: 1,
      });
    }

    await child.save();
    const populated = await child.populate('progress.skill');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE child
router.delete('/:id', async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);
    if (!child) return res.status(404).json({ error: 'Child not found' });
    res.json({ message: 'Child profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
