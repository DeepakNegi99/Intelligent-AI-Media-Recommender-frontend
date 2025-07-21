import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import  Grid  from '@mui/material/Grid';
import type { RecommendationResponse } from './types';

const RecommendationsPage = () => {
  const [data, setData] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.post<RecommendationResponse>(
          'http://localhost:5000/api/recommendations',
          {
            // Example input
            userId: '12345',
          }
        );
        setData(res.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  const renderCards = (items: any[], type: 'Book' | 'Movie' | 'TV') =>
    items.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Card sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            height="180"
            image={item.imageUrl}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Recommended Books</Typography>
      <Grid container spacing={3}>
        {data?.books && renderCards(data.books, 'Book')}
      </Grid>

      <Typography variant="h4" gutterBottom mt={4}>Recommended Movies</Typography>
      <Grid container spacing={3}>
        {data?.movies && renderCards(data.movies, 'Movie')}
      </Grid>

      <Typography variant="h4" gutterBottom mt={4}>Recommended TV Series</Typography>
      <Grid container spacing={3}>
        {data?.tvSeries && renderCards(data.tvSeries, 'TV')}
      </Grid>
    </Container>
  );
};

export default RecommendationsPage;
