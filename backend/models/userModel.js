const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { foodSchema } = require('../models/foodModel.js');

const weightSchema = mongoose.Schema(
  {
    weight: Number,
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    weightChange: [weightSchema],
    intake: {
      calories: {
        type: Number,
        default: 2000,
      },
      protein: {
        type: Number,
        default: 75,
      },
      ch: {
        type: Number,
        default: 275,
      },
      fat: {
        type: Number,
        default: 67,
      },
    },
    foodsEaten: [foodSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
