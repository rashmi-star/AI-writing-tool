require('dotenv').config();  // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Chapter = require('./models/Chapter');

const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Simple Test Route
app.get('/', (req, res) => {
  res.send('AI Writer Tool Backend is running');
});

// Fetch latest news using NewsAPI
app.post('/fetch-news', async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Error fetching news');
  }
});

// Fetch references from Google Scholar using SerpAPI
app.post('/fetch-references', async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await axios.get(`https://serpapi.com/search.json?q=${encodeURIComponent(topic)}&engine=google_scholar&api_key=${process.env.SERP_API_KEY}`);
    res.json(response.data.organic_results);
  } catch (error) {
    console.error('Error fetching references:', error);
    res.status(500).send('Error fetching references');
  }
});

// Save chapter content to MongoDB
app.post('/save-chapter', async (req, res) => {
  const { topic, chapter, content } = req.body;
  try {
    const newChapter = new Chapter({ topic, chapter, content });
    await newChapter.save();
    res.json({ message: 'Chapter saved successfully' });
  } catch (error) {
    console.error('Error saving chapter:', error);
    res.status(500).send('Error saving chapter');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
