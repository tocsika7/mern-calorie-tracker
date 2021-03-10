const calculateSum = (foodEatenToday) => {
  let calories = [];
  let protein = [];
  let fat = [];
  let ch = [];

  foodEatenToday.forEach((food) => {
    calories.push(food.calories);
    protein.push(food.protein);
    fat.push(food.fat);
    ch.push(food.ch);
  });

  return {
    calories: calories.reduce((a, b) => a + b, 0),
    protein: protein.reduce((a, b) => a + b, 0),
    fat: fat.reduce((a, b) => a + b, 0),
    ch: ch.reduce((a, b) => a + b, 0),
  };
};

module.exports = calculateSum;
