import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function ArticleCard({ article }) {
  return (
    <Card style={{ margin: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {article.description}
        </Typography>
        <Button href={article.url} target="_blank" variant="outlined" color="primary">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;
