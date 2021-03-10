const app = require('../testServer.js');
const User = require('../../models/userModel.js');
const supertest = require('supertest');
const request = supertest(app);
const { setupDB } = require('../test-setup.js');

setupDB('req-test');

let token;

beforeEach(async (done) => {
  const res = await request.post('/api/users/login').send({
    username: 'Test User',
    password: '123',
  });
  token = res.body.token;
  done();
});

it('Should get  daily requirements', async (done) => {
  const res = await request
    .get('/api/requirements')

    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.intake).toBeDefined();
  expect(res.body.intake).toHaveProperty('calories', 'protiein', 'fat', 'ch');
  done();
});

it('Should update  daily requirements', async (done) => {
  const reqBeforeUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );

  const res = await request
    .put('/api/requirements')
    .send({
      weight: 100,
      height: 180,
    })
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Update success');

  const reqAfterUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );
  expect(reqBeforeUpdate).not.toEqual(reqAfterUpdate);
  done();
});

it('Should fail to update, invalid weight', async (done) => {
  const reqBeforeUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );

  const res = await request
    .put('/api/requirements')
    .send({
      weight: -5,
      height: 180,
    })
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Invalid height or weight');

  const reqAfterUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );
  expect(reqBeforeUpdate).toEqual(reqAfterUpdate);
  done();
});

it('Should fail to update, invalid height', async (done) => {
  const reqBeforeUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );

  const res = await request
    .put('/api/requirements')
    .send({
      weight: 80,
      height: 23,
    })
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Invalid height or weight');

  const reqAfterUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );
  expect(reqBeforeUpdate).toEqual(reqAfterUpdate);
  done();
});

it('Should fail to update, invalid height and weight', async (done) => {
  const reqBeforeUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );

  const res = await request
    .put('/api/requirements')
    .send({
      weight: -5,
      height: 23,
    })
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Invalid height or weight');

  const reqAfterUpdate = await User.findOne(
    { username: 'Test User' },
    { intake: 1 }
  );
  expect(reqBeforeUpdate).toEqual(reqAfterUpdate);
  done();
});
