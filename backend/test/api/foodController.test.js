const app = require('../testServer.js');
const { Food } = require('../../models/foodModel.js');
const supertest = require('supertest');
const request = supertest(app);
const { setupDB } = require('../test-setup.js');

setupDB('food-test');

let token;

beforeEach(async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '123',
  });
  token = res.body.token;
  done();
});

it('Should save food to the database', async (done) => {
  const res = await request
    .post('/api/foods')
    .send({
      name: 'test_food',
      gramms: 100,
      calories: 200,
      protein: 4,
      ch: 20,
      fat: 1,
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(201);
  expect(res.body.name).toBe('test_food');
  expect(res.body.gramms).toBe(100);
  expect(res.body.calories).toBe(200);
  expect(res.body.protein).toBe(4);
  expect(res.body.ch).toBe(20);
  expect(res.body.fat).toBe(1);

  const foodSavedToDb = await Food.findOne({ name: 'test_food' });
  expect(foodSavedToDb).toBeTruthy();

  done();
});

it('Should say food already exists', async (done) => {
  const res = await request
    .post('/api/foods')
    .send({
      name: 'steak',
      gramms: 100,
      calories: 200,
      protein: 4,
      ch: 20,
      fat: 1,
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.body.message).toBe('Duplication Error: Food already exists');
  done();
});

it('Should get food by name', async (done) => {
  const res = await request
    .get('/api/foods/name/steak')
    .set('Authorization', `Bearer ${token}`);

  const resFood = res.body[0];
  expect(resFood).toBeTruthy();
  expect(res.status).toBe(200);
  expect(resFood.name).toBe('steak');
  expect(resFood.gramms).toBe(150);
  expect(resFood.calories).toBe(308);
  expect(resFood.protein).toBe(41);
  expect(resFood.ch).toBe(0);
  expect(resFood.fat).toBe(15);

  done();
});

it('Should get two food items by name', async (done) => {
  const res = await request
    .get('/api/foods/name/s')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);

  const resFoods = res.body;
  expect(resFoods).toBeTruthy();
  expect(resFoods.length).toBe(2);

  done();
});

it('Should get two food items by name', async (done) => {
  const res = await request
    .get('/api/foods/name/s')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);

  const resFoods = res.body;
  expect(resFoods).toBeTruthy();
  expect(resFoods.length).toBe(2);

  done();
});

it('Should not get any foods by name', async (done) => {
  const res = await request
    .get('/api/foods/name/dinnye')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(404);
  expect(res.body.message).toBe('NotFoundError: Food not found');

  done();
});

it('Should get food by id', async (done) => {
  const food = await Food.findOne({ name: 'steak' }, { _id: 1 });

  const res = await request
    .get(`/api/foods/${food._id}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);

  const resFood = res.body;
  expect(resFood).toBeTruthy();
  expect(res.status).toBe(200);
  expect(resFood.name).toBe('steak');
  expect(resFood.gramms).toBe(150);
  expect(resFood.calories).toBe(308);
  expect(resFood.protein).toBe(41);
  expect(resFood.ch).toBe(0);
  expect(resFood.fat).toBe(15);
  done();
});

it('Should return food not found', async (done) => {
  const res = await request
    .get('/api/foods/603560d7c79a67da3371c485')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(404);
  expect(res.body.message).toBe('NotFoundError: Food not found');
  done();
});
