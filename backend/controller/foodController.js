const { Food } = require('../models/foodModel.js');
const asyncHandler = require('express-async-handler');

// @desc Add a new food
// @route POST /api/foods/
// @access Private
const addFood = asyncHandler(async (req, res) => {
  const { name, gramms, calories, protein, ch, fat } = req.body;

  const foodExists = await Food.findOne({ name });

  if (foodExists) {
    res.status(409);
    throw new Error('Duplication Error: Food already exists');
  }

  try {
    const food = await Food.create({
      name,
      gramms,
      calories,
      protein,
      ch,
      fat,
    });

    res.status(201).json({
      _id: food._id,
      name: food.name,
      gramms: food.gramms,
      calories: food.calories,
      protein: food.protein,
      ch: food.ch,
      fat: food.fat,
    });
  } catch (error) {
    res.status(400);
    throw new Error('Food Validation Error: Fill in all fields');
  }
});

// @desc Lists all foods with a matching name
// @route GET /api/foods/:name
// @access Public
const getFoodByName = asyncHandler(async (req, res) => {
  const foodName = req.params.name;
  const foods = await Food.find({ name: { $regex: foodName, $options: 'i' } });

  if (foods.length !== 0) {
    res.status(200).json(foods);
  } else {
    res.status(404);
    throw new Error('NotFoundError: Food not found');
  }
});

/*
@desc Get the food with matching id 
@route GET /api/foods/:id
@access Public
*/
const getFoodById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);

  if (food) {
    res.json(food);
  } else {
    res.status(404);
    throw new Error('NotFoundError: Food not found');
  }
});

module.exports = {
  addFood: addFood,
  getFoodById: getFoodById,
  getFoodByName: getFoodByName,
};
