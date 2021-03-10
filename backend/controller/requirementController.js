const asyncHandler = require('express-async-handler');
const calculateIntake = require('../utils/calculateIntake.js');
const User = require('../models/userModel.js');

// @desc Generates the daily caloric requirements for the user
// @route PUT /api/requirements (updates the user)
// @access Private
const generateDailyRequirements = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { weight, height } = req.body;

  if (weight <= 0 || height <= 100) {
    res.status(400);
    throw new Error('Invalid height or weight');
  }
  if (!user) {
    throw new Error(`NotFoundError: User not found`);
  } else {
    const intake = calculateIntake(weight, height);
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          intake: intake,
        },
        $push: {
          weightChange: {
            weight: weight,
          },
        },
      }
    );
    res.json({ message: 'Update success' });
  }
});

// @desc Lists the daily caloric requirements of the user
// @route GET /api/requirements
// @access Private
const getDailyRequirements = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, { intake: 1 });

  if (user) {
    res.json({
      intake: user.intake,
    });
  } else {
    res.status(404);
    throw new Error('NotFoundError: User not found');
  }
});

module.exports = {
  generateDailyRequirements: generateDailyRequirements,
  getDailyRequirements: getDailyRequirements,
};
