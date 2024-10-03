import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './components/TextEditor';
import { Container, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import './App.css';  // Custom styling for additional aesthetics

function App() {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [references, setReferences] = useState([]);
  const [chapterText, setChapterText] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  // Fetch latest news or research articles
  const fetchNews = async () => {
    try {
      const response = await axios.post('http://localhost:5000/fetch-news', { topic });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch references from Google Scholar
  const fetchReferences = async () => {
    try {
      const response = await axios.post('http://localhost:5000/fetch-references', { topic });
      setReferences(response.data);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  // Save chapter content
  const saveChapter = async () => {
    try {
      await axios.post('http://localhost:5000/save-chapter', { topic, chapter: chapterTitle, content: chapterText });
      alert('Chapter saved successfully!');
    } catch (error) {
      console.error('Error saving chapter:', error);
    }
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Typography variant="h3" gutterBottom align="center" className="main-title">
        AI Writer Tool
      </Typography>

      {/* Topic Input */}
      <TextField
        label="Enter a topic"
        variant="outlined"
        fullWidth
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="input-field"
      />

      {/* Fetch News and References Buttons */}
      <div className="button-group">
        <Button variant="contained" color="primary" onClick={fetchNews}>
          Get Latest News
        </Button>
        <Button variant="contained" color="secondary" onClick={fetchReferences} style={{ marginLeft: '10px' }}>
          Get References
        </Button>
      </div>

      {/* Display Latest News */}
      <div className="news-section">
        <Typography variant="h5" gutterBottom>
          Latest News
        </Typography>
        {articles.length > 0 ? articles.map((article, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" gutterBottom>{article.description}</Typography>
              <Button variant="outlined" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </Button>
            </CardContent>
          </Card>
        )) : <Typography>No articles available. Try a different topic.</Typography>}
      </div>

      {/* Display References */}
      <div className="references-section">
        <Typography variant="h5" gutterBottom>
          References
        </Typography>
        {references.length > 0 ? references.map((reference, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{reference.title}</Typography>
              <Typography variant="body2" gutterBottom>{reference.snippet}</Typography>
              <Button variant="outlined" color="secondary" href={reference.link} target="_blank" rel="noopener noreferrer">
                View Reference
              </Button>
            </CardContent>
          </Card>
        )) : <Typography>No references available. Try a different topic.</Typography>}
      </div>

      {/* Chapter Title Input */}
      <TextField
        label="Chapter Title"
        variant="outlined"
        fullWidth
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
        className="input-field"
      />

      {/* Text Editor */}
      <div className="editor-container">
        <TextEditor content={chapterText} setContent={setChapterText} />
      </div>

      {/* Save Chapter Button */}
      <Button variant="contained" color="success" onClick={saveChapter} style={{ marginTop: '20px' }}>
        Save Chapter
      </Button>
    </Container>
  );
}

export default App;
