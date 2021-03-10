const express = require('express');
const foodRoutes = require('../routes/foodRoutes.js');
const userRoutes = require('../routes/userRoutes.js');
const requirementRoutes = require('../routes/requirementRoutes.js');
const intakeRoutes = require('../routes/intakeRoutes');
const errorHandler = require('../middleware/errorMiddleware.js');

const app = express();

app.use(express.json());
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/intake', intakeRoutes);

app.use(errorHandler);

module.exports = app;
