import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['work', 'education', 'certification', 'hackathon'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  certificateUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Experience', experienceSchema);
