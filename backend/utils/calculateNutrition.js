function calculateNutrition({ name, calories, protein, ch, fat }, gramms) {
  const newCalories = calcluateValue(calories, gramms);
  const newProtein = calcluateValue(protein, gramms);
  const newFat = calcluateValue(fat, gramms);
  const newCh = calcluateValue(ch, gramms);

  return {
    name: name,
    gramms: gramms,
    calories: newCalories,
    protein: newProtein,
    fat: newFat,
    ch: newCh,
  };
}

const calcluateValue = (num, gramms) => {
  return num === 0 ? 0 : Math.round((num / 100) * gramms);
};

module.exports = calculateNutrition;
