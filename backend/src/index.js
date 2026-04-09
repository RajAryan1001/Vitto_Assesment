require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const lendingRoutes = require('./routes/lendingRoutes');
const errorHandler = require('./middleware/errorHandler');   // ← Yeh line add karo

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', lendingRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: "Vitto MSME Lending Backend is running 🚀" });
});

// **Error Handler - Sabse last mein lagana hai**
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

startServer();