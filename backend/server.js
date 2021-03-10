const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const foodRoutes = require('./routes/foodRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const requirementRoutes = require('./routes/requirementRoutes.js');
const intakeRoutes = require('./routes/intakeRoutes');
const errorHandler = require('./middleware/errorMiddleware.js');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/intake', intakeRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, console.log(`Server is running on port: ${PORT}`.yellow.bold));

module.exports = app;
