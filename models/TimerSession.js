const mongoose = require('mongoose');

const timerSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  status: {
    type: String,
    enum: ['running', 'paused', 'completed'],
    default: 'running'
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.TimerSession || mongoose.model('TimerSession', timerSessionSchema);
