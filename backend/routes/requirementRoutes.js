const express = require('express');
const protect = require('../middleware/authMiddleware.js');
const {
  generateDailyRequirements,
  getDailyRequirements,
} = require('../controller/requirementController.js');

const router = express.Router();

router.route('/').put(protect, generateDailyRequirements);
router.route('/').get(protect, getDailyRequirements);

module.exports = router;
