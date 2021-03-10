const express = require('express');
const {
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  getWeightChangeList,
} = require('../controller/userController');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/register').post(registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserById);
router.route('/profile').put(protect, updateUser);
router.route('/weight').get(protect, getWeightChangeList);

module.exports = router;
