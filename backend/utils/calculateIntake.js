const calculateIntake = (weight, height) => {
  const base_calories = (weight * 30 + weight * 35) / 2;
  const deficit_calories = base_calories * 0.8;
  const protein = weight * 2;
  const fat = ((deficit_calories - protein * 4) * 0.2) / 8;
  const ch = (deficit_calories - protein * 4 - fat * 8) / 4;

  return {
    calories: Math.round(deficit_calories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    ch: Math.round(ch),
  };
};

module.exports = calculateIntake;
