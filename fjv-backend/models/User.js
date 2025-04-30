// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['client', 'staff', 'admin'],
    default: 'client'
  },
  accessCode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash access code before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('accessCode')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.accessCode = await bcrypt.hash(this.accessCode, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check access code
userSchema.methods.matchAccessCode = async function(enteredCode) {
  return await bcrypt.compare(enteredCode, this.accessCode);
};

module.exports = mongoose.model('User', userSchema);