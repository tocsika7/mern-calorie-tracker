const express = require('express');
const { addFood } = require('../controller/foodController');
const { getFoodById } = require('../controller/foodController');
const { getFoodByName } = require('../controller/foodController');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').post(protect, addFood);
router.route('/name/:name').get(protect, getFoodByName);
router.route('/:id').get(getFoodById);

module.exports = router;
