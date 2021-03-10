const calculateIntake = require('../../utils/calculateIntake');

test('Happy path: 1', () => {
  const result = { calories: 2210, protein: 170, fat: 38, ch: 306 };
  expect(calculateIntake(85, 180)).toEqual(result);
});

test('Happy path: 2', () => {
  const result = { calories: 1300, protein: 100, fat: 23, ch: 180 };
  expect(calculateIntake(50, 150)).toEqual(result);
});

test('Invalid Weight', () => {
  expect(() => calculateIntake(-5, 170)).toThrow('Invalid height or weight');
});

test('Invalid Height', () => {
  expect(() => calculateIntake(75, 36)).toThrow('Invalid height or weight');
});

test('Invalid Weight and Height', () => {
  expect(() => calculateIntake(-35.5, -23.4)).toThrow(
    'Invalid height or weight'
  );
});
