const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create skill
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Seed default skills
router.post('/seed', async (req, res) => {
  try {
    const count = await Skill.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Skills already seeded', count });
    }

    const defaultSkills = [
      {
        name: 'Reading',
        icon: '📚',
        color: '#FF6B6B',
        description: 'Explore magical stories and build vocabulary!',
        totalLevels: 10,
      },
      {
        name: 'Math',
        icon: '🔢',
        color: '#4ECDC4',
        description: 'Solve fun puzzles and master numbers!',
        totalLevels: 10,
      },
      {
        name: 'Art',
        icon: '🎨',
        color: '#FFE66D',
        description: 'Express yourself with colors and shapes!',
        totalLevels: 10,
      },
      {
        name: 'Music',
        icon: '🎵',
        color: '#A78BFA',
        description: 'Discover rhythms and create melodies!',
        totalLevels: 10,
      },
      {
        name: 'Coding',
        icon: '💻',
        color: '#34D399',
        description: 'Build cool things with code!',
        totalLevels: 10,
      },
      {
        name: 'Science',
        icon: '🔬',
        color: '#60A5FA',
        description: 'Discover how the world works!',
        totalLevels: 10,
      },
      {
        name: 'Sports',
        icon: '⚽',
        color: '#F97316',
        description: 'Stay active and learn teamwork!',
        totalLevels: 10,
      },
    ];

    await Skill.insertMany(defaultSkills);
    res.status(201).json({ message: 'Skills seeded successfully!', count: defaultSkills.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
