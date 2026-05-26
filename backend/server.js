import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });