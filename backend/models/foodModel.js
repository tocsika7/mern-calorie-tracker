const mongoose = require('mongoose');
const getDateNow = require('../utils/date.js');

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gramms: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    ch: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    addedAt: {
      type: String,
      default: getDateNow,
    },
  },
  {
    timestamps: false,
  }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = {
  Food: Food,
  foodSchema: foodSchema,
};
