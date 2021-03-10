const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const { Food } = require('../models/foodModel.js');
const foodModel = require('../models/foodModel.js');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

const foodData = [
  {
    name: 'steak',
    gramms: 150,
    calories: 308,
    protein: 41,
    ch: 0,
    fat: 15,
  },
  {
    name: 'rizs',
    gramms: 200,
    calories: 260,
    protein: 1,
    ch: 56,
    fat: 5,
  },
];

const userData = {
  username: 'Test User',
  email: 'test@mail.com',
  password: '123',
  weightChange: [{ weight: 85 }, { weight: 83 }, { weight: 79 }],
  foodsEaten: foodData,
};

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running'))
        return;
      console.log(error.message);
    }
  }
}

module.exports = {
  setupDB(databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1:27018/${databaseName}`;
      await mongoose.connect(url, { useNewUrlParser: true });
    });

    beforeEach(async () => {
      const user = new User(userData);
      await user.save();
      foodData.forEach(async (element) => {
        const food = new Food(element);
        await food.save();
      });
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
