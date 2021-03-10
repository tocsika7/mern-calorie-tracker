const asyncHandler = require('express-async-handler');
const colors = require('colors');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

// @desc Registers the user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error('DuplicationError: User with email already exists');
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    res.status(409);
    throw new Error('DuplicationError: User with username already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({ message: 'Registration successful' });
  } else {
    res.status(400);
    throw new Error('UserValidationError: Invalid user data');
  }
});

// @desc Authenticates the user, generates JWT
// @route GET /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc Lists user information
// @route GET /api/users/profile
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error(`NotFoundError: User not found`);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    res.json({
      message: 'Update Success',
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('NotFoundError: User not found');
  }
});

const getWeightChangeList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, { weightChange: 1 });
  if (user) {
    res.json({
      weightChange: user.weightChange,
    });
  } else {
    res.status(404);
    throw new Error('NotFoundError: User not found');
  }
});

module.exports = {
  registerUser: registerUser,
  getUserById: getUserById,
  loginUser: loginUser,
  updateUser: updateUser,
  getWeightChangeList: getWeightChangeList,
};
