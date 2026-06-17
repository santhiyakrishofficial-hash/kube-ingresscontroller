const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Reading', 'Math', 'Art', 'Music', 'Coding', 'Science', 'Sports'],
    },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    totalLevels: { type: Number, default: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
