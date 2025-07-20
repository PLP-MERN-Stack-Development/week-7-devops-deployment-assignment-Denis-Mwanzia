const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/users', userRoutes);

// Only connect to MongoDB and start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('✅ MongoDB Connected');
      app.listen(process.env.PORT || 5000, () =>
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
      );
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));
}

module.exports = app;
