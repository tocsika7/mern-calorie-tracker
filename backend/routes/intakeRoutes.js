const express = require('express');
const protect = require('../middleware/authMiddleware.js');
const {
  addToIntake,
  getIntake,
  getAverageMealNutrition,
  getSumDailyNutrition,
  deleteFromIntake,
} = require('../controller/intakeController.js');

const router = express.Router();

router.route('/').post(protect, addToIntake);
router.route('/').get(protect, getIntake);
router.route('/:id').delete(protect, deleteFromIntake);
router.route('/sum').get(protect, getSumDailyNutrition);
router.route('/avg').get(protect, getAverageMealNutrition);

module.exports = router;
