const mongoose = require('mongoose');

// Define the schema for storing chapters
const ChapterSchema = new mongoose.Schema({
  topic: String,
  chapter: String,
  content: String,
});

// Create the model from the schema
const Chapter = mongoose.model('Chapter', ChapterSchema);

module.exports = Chapter;
