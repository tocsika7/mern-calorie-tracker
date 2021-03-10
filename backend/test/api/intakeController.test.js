const app = require('../testServer.js');
const User = require('../../models/userModel.js');
const supertest = require('supertest');
const request = supertest(app);
const { setupDB } = require('../test-setup.js');

setupDB('intake-test');

let token;

beforeEach(async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '123',
  });
  token = res.body.token;
  done();
});

it('Should add food to daily intake', async (done) => {
  const res = await request
    .post('/api/intake')
    .send({
      gramms: 100,
      food: {
        name: 'test_food',
        calories: 230,
        protein: 23,
        ch: 12,
        fat: 14,
      },
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(201);
  expect(res.body.message).toBe('Food added');

  const foodAdded = await User.findOne(
    { username: 'Test User' },
    { foodsEaten: 1 }
  );
  expect(foodAdded).toBeDefined();
  expect(foodAdded.foodsEaten[2]).toBeDefined();
  expect(foodAdded.foodsEaten[2]).toMatchObject({
    name: 'test_food',
    calories: 230,
    protein: 23,
    ch: 12,
    fat: 14,
    gramms: 100,
  });
  done();
});

it('Should return invalid gramm value', async (done) => {
  const res = await request
    .post('/api/intake')
    .send({
      gramms: -5,
      food: {
        name: 'test_food',
        calories: 230,
        protein: 23,
        ch: 12,
        fat: 14,
      },
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Invalid gramm value');

  const foodAdded = await User.findOne(
    { username: 'Test User' },
    { foodsEaten: 1 }
  );
  expect(foodAdded).toBeDefined();
  expect(foodAdded.foodsEaten[2]).not.toBeDefined();

  done();
});

it('Should get  daily intake', async (done) => {
  const res = await request
    .get('/api/intake')

    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.food).toBeDefined();
  expect(res.body.food.length).toBe(2);
  expect(res.body.sum).toBeDefined();

  done();
});

it('Should delete food from daily intake', async (done) => {
  const foods = await User.findOne(
    { username: 'Test User' },
    { foodsEaten: 1 }
  );
  const foodId = foods.foodsEaten[1]._id;

  const res = await request
    .delete(`/api/intake/${foodId}`)

    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Delete success');

  const foodsAfterDelete = await User.findOne(
    { username: 'Test User' },
    { foodsEaten: 1 }
  );

  expect(foodsAfterDelete.foodsEaten[1]).not.toBeDefined();

  done();
});

it('Should say delete failed', async (done) => {
  const res = await request
    .delete(`/api/intake/603560d7c79a67da3371c48g`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(404);
  expect(res.body.message).toBe(
    'NotFoundError: Delete failed, food by this id doesnt exists'
  );

  done();
});

it('Should get average nutrition', async (done) => {
  const res = await request
    .get(`/api/intake/avg`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty(
    'avgCalories',
    'avgProtien',
    'avgCarbs',
    'avgFat'
  );
  done();
});

it('Should get sum of daily nutritions', async (done) => {
  const res = await request
    .get(`/api/intake/sum`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body[0]).toHaveProperty('_id', 'sumCalories', 568);
  done();
});
