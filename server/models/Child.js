const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  activitiesCompleted: { type: Number, default: 0 },
});

const childSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 3, max: 15 },
    avatar: { type: String, default: '🧒' },
    totalPoints: { type: Number, default: 0 },
    badges: [{ type: String }],
    progress: [progressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Child', childSchema);
