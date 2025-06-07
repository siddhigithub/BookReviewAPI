// server.js
const dotenv = require('dotenv');
dotenv.config(); // Load .env variables BEFORE anything else

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
connectDB(); // Now this will have access to process.env.MONGO_URI

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

app.get('/', (req, res) => {
  res.send('Book Review API is running');
});


//MONGO_URI=mongodb://localhost:27017/bookreview
