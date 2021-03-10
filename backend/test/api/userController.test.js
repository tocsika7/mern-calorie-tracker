const app = require('../testServer.js');
const User = require('../../models/userModel.js');
const supertest = require('supertest');
const request = supertest(app);
const { setupDB } = require('../test-setup.js');

setupDB('user-test');

let token;

beforeEach(async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '123',
  });
  token = res.body.token;
  done();
});

it('Should save user to database', async (done) => {
  const res = await request.post('/api/users/register').send({
    username: 'Test John',
    email: 'testjohn@gmail.com',
    password: '12345',
  });
  const user = await User.findOne({ email: 'testjohn@gmail.com' });
  expect(user.email).toBe('testjohn@gmail.com');
  expect(user.intake).toBeTruthy();
  expect(user.username).toBe('Test John');
  expect(user.password).toBeTruthy();
  expect(user.foodsEaten).toBeTruthy();
  expect(user.weightChange).toBeTruthy();
  expect(res.body.message).toBe('Registration successful');
  done();
});

it('Should return user already exists username', async (done) => {
  const res = await request.post('/api/users/register').send({
    username: 'Test User',
    email: 'testjohn@gmail.com',
    password: '12345',
  });

  const user = await User.findOne({ username: 'Test Joe' });
  expect(user).toBeFalsy();
  expect(res.status).toBe(409);
  expect(res.body.message).toBe(
    'DuplicationError: User with username already exists'
  );

  done();
});

it('Should return user already exists email', async (done) => {
  const res = await request.post('/api/users/register').send({
    username: 'Test Joe',
    email: 'test@mail.com',
    password: '12345',
  });

  const user = await User.findOne({ username: 'Test Joe' });
  expect(user).toBeFalsy();
  expect(res.status).toBe(409);
  expect(res.body.message).toBe(
    'DuplicationError: User with email already exists'
  );

  done();
});

it('Should login the user', async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '123',
  });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeTruthy();

  done();
});

it('Should fail the login: Invalid username', async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Invalid Username',
    password: '123',
  });

  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Invalid username or password');

  done();
});

it('Should fail the login: Invalid password', async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '12345',
  });
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Invalid username or password');

  done();
});

it('Should list user info', async (done) => {
  const res = await request
    .get('/api/users/profile')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.username).toBe('Test User');
  expect(res.body.email).toBe('test@mail.com');

  done();
});

it('Should return unauthorized no token', async (done) => {
  const res = await request.get('/api/users/profile');

  expect(res.status).toBe(401);
  expect(res.body.username).toBeFalsy();
  expect(res.body.email).toBeFalsy();
  expect(res.body.message).toBe('Unauthorized, no token');

  done();
});

it('Should update all user info', async (done) => {
  const res = await request
    .put('/api/users/profile')
    .send({
      username: 'Test User 2',
      email: 'test2@mail.com',
      password: '12345',
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Update Success');
  expect(res.body.username).toBe('Test User 2');
  expect(res.body.email).toBe('test2@mail.com');
  done();
});

it('Should update username', async (done) => {
  const res = await request
    .put('/api/users/profile')
    .send({
      username: 'Test User 2',
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Update Success');
  expect(res.body.username).toBe('Test User 2');
  expect(res.body.email).toBe('test@mail.com');
  done();
});

it('Should update email', async (done) => {
  const res = await request
    .put('/api/users/profile')
    .send({
      email: 'test2@mail.com',
    })
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Update Success');
  expect(res.body.username).toBe('Test User');
  expect(res.body.email).toBe('test2@mail.com');
  done();
});

it('Should get weight change array', async (done) => {
  const res = await request
    .get('/api/users/weight')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.weightChange).toBeTruthy();
  expect(res.body.weightChange[0].weight).toBe(85);
  expect(res.body.weightChange[1].weight).toBe(83);
  expect(res.body.weightChange[2].weight).toBe(79);

  done();
});
