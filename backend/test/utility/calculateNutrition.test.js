const calculateNutrition = require('../../utils/calculateNutrition');

test('Happy path 1', () => {
  const result = {
    name: 'Banán',
    gramms: 200,
    calories: 142,
    protein: 4,
    ch: 34,
    fat: 0,
  };
  const inputFoodObj = {
    name: 'Banán',
    calories: 71,
    protein: 2,
    ch: 17,
    fat: 0,
  };
  expect(calculateNutrition(inputFoodObj, 200)).toEqual(result);
});

test('Happy path 2', () => {
  const result = {
    name: 'Sárgadinnye',
    gramms: 175,
    calories: 65,
    protein: 1,
    ch: 16,
    fat: 0,
  };
  const inputFoodObj = {
    name: 'Sárgadinnye',
    calories: 37,
    protein: 0.75,
    ch: 9,
    fat: 0,
  };
  expect(calculateNutrition(inputFoodObj, 175)).toEqual(result);
});

test('Invalid gramms', () => {
  const inputFoodObj = {
    name: 'Sárgadinnye',
    calories: 37,
    protein: 0.75,
    ch: 9,
    fat: 0,
  };
  expect(() => calculateNutrition(inputFoodObj, 0)).toThrow(
    'Invalid gramm value'
  );
});

test('Invalid gramms 2', () => {
  const inputFoodObj = {
    name: 'Sárgadinnye',
    calories: 37,
    protein: 0.75,
    ch: 9,
    fat: 0,
  };
  expect(() => calculateNutrition(inputFoodObj, -5.35)).toThrow(
    'Invalid gramm value'
  );
});
