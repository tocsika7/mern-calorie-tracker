const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const getDateNow = require('../utils/date.js');
const calculateSum = require('../utils/calculateSum.js');
const calculateNutrition = require('../utils/calculateNutrition.js');

// @dec Adds food to the daily intake
// @route PUT /api/intake
// @access Private
const addToIntake = asyncHandler(async (req, res) => {
  const { food, gramms } = req.body;
  if (gramms <= 0) {
    res.status(400);
    throw new Error('Invalid gramm value');
  }

  const user = await User.findById(req.user._id);
  if (user) {
    const calculatedNutrition = calculateNutrition(food, gramms);
    try {
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          $push: {
            foodsEaten: {
              name: calculatedNutrition.name,
              calories: calculatedNutrition.calories,
              gramms: gramms,
              protein: calculatedNutrition.protein,
              ch: calculatedNutrition.ch,
              fat: calculatedNutrition.fat,
            },
          },
        }
      );
      res.status(201);
      res.json({ message: 'Food added' });
    } catch (error) {
      res.status(400);
      throw new Error('Food Validation Error: Fill in all fields');
    }
  } else {
    res.status(401);
    throw new Error('Auth Error: User not found');
  }
});

// @desc Lists all the foods eaten today by the user
// @route GET /api/intake
// @access Private
const getIntake = asyncHandler(async (req, res) => {
  const todaysDate = getDateNow();
  let foodEatenToday = [];

  const user = await User.findById(req.user._id, {
    foodsEaten: { $slice: -50 },
  });

  if (!user) {
    res.status(401);
    throw new Error('Auth Error: User not found');
  } else {
    user.foodsEaten.forEach((food) => {
      if (food.addedAt === todaysDate) {
        foodEatenToday.push(food);
      }
    });

    const sumIntake = calculateSum(foodEatenToday);

    res.json({
      food: foodEatenToday,
      sum: {
        calories: sumIntake.calories,
        protein: sumIntake.protein,
        fat: sumIntake.fat,
        ch: sumIntake.ch,
      },
    });
  }
});

const getIntakeBeta = asyncHandler(async (req, res) => {
  const today = getDateNow();
  const foods = await User.aggregate([
    { $match: { _id: req.user._id } },
    {
      $project: {
        foodsEaten: {
          $filter: {
            input: '$foodsEaten',
            as: 'foodItem',
            cond: { $eq: ['$$foodItem.addedAt', today] },
          },
        },
      },
    },
  ]);

  if (foods) {
    console.log(foods);
    res.json(foods[0].foodsEaten);
  } else {
    throw new Error('No foods :/');
  }
});

// @desc Deletes a food based on id from the users daily intake
// @route DELETE /api/intake
// @access Private
const deleteFromIntake = asyncHandler(async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { foodsEaten: { _id: req.params.id } } }
    );
    res.json({ message: 'Delete success' });
  } catch (error) {
    res.status(404);
    throw new Error(
      'NotFoundError: Delete failed, food by this id doesnt exists'
    );
  }
});

const getSumDailyNutrition = asyncHandler(async (req, res) => {
  try {
    const filter = { _id: req.user._id };
    const user = await User.aggregate([
      { $match: filter },
      { $unwind: '$foodsEaten' },
      {
        $group: {
          _id: '$foodsEaten.addedAt',
          sumCalories: { $sum: '$foodsEaten.calories' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.json(user);
  } catch (error) {
    res.status(500);
    throw new Error('Query Error: Error while getting daily Sum');
  }
});

const getAverageMealNutrition = asyncHandler(async (req, res) => {
  try {
    const filter = { _id: req.user._id };
    const user = await User.aggregate([
      { $match: filter },
      { $unwind: '$foodsEaten' },
      {
        $group: {
          _id: '$_id',
          avgCalories: { $avg: '$foodsEaten.calories' },
          avgProtein: { $avg: '$foodsEaten.protein' },
          avgCarbs: { $avg: '$foodsEaten.ch' },
          avgFat: { $avg: '$foodsEaten.fat' },
        },
      },
    ]);

    if (!user[0]) {
      res.json({
        avgCalories: 0,
        avgProtein: 0,
        avgCarbs: 0,
        avgFat: 0,
      });
    } else {
      res.json({
        avgCalories: user[0].avgCalories,
        avgProtein: user[0].avgProtein,
        avgCarbs: user[0].avgCarbs,
        avgFat: user[0].avgFat,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error('Query Error: Error while getting daily average');
  }
});

module.exports = {
  getIntake: getIntake,
  deleteFromIntake: deleteFromIntake,
  addToIntake: addToIntake,
  getSumDailyNutrition: getSumDailyNutrition,
  getAverageMealNutrition: getAverageMealNutrition,
  getIntakeBeta: getIntakeBeta,
};
