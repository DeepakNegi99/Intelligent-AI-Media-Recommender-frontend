import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  type SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
// Update the import path to the correct location of recommendationApi
import { useGetRecommendationsQuery } from "../redux/api/recommendationApi";

const RecommendationsPage: React.FC = () => {
  const userId = localStorage.getItem("userId") || "defaultUser";
  const { data, isLoading, error } = useGetRecommendationsQuery(userId);
  const [sortBy, setSortBy] = useState("title");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const sortItems = (items: any[]) => {
    return [...items].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "year") return (b.releaseYear || 0) - (a.releaseYear || 0);
      return 0;
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Failed to fetch recommendations.</Typography>
      </Box>
    );
  }

  const sortedBooks = sortItems(data?.books || []);
  const sortedMovies = sortItems(data?.movies || []);
  const sortedSeries = sortItems(data?.series || []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Recommendations
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="year">Release Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h5" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={2}>
        {sortedBooks.map((book: any) => (
          <div
            key={book._id}
            style={{
              flex: "1 1 30%",
              minWidth: 250,
              margin: "12px",
              display: "flex",
            }}
          >
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">Genre: {book.genre}</Typography>
                <Typography variant="body2">Rating: {book.rating}</Typography>
                <Typography variant="body2">
                  Year: {book.releaseYear}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom mt={4}>
        Movies
      </Typography>
      <Grid container spacing={2}>
        {sortedMovies.map((movie: any) => (
          <div
            key={movie._id}
            style={{
              flex: "1 1 30%",
              minWidth: 250,
              margin: "12px",
              display: "flex",
            }}
          >
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Genre: {movie.genre}</Typography>
                <Typography variant="body2">Rating: {movie.rating}</Typography>
                <Typography variant="body2">
                  Year: {movie.releaseYear}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom mt={4}>
        TV Series
      </Typography>
      <Grid container spacing={2}>
        {sortedSeries.map((series: any) => (
          <div
            key={series._id}
            style={{
              flex: "1 1 30%",
              minWidth: 250,
              margin: "12px",
              display: "flex",
            }}
          >
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{series.title}</Typography>
                <Typography variant="body2">Genre: {series.genre}</Typography>
                <Typography variant="body2">Rating: {series.rating}</Typography>
                <Typography variant="body2">
                  Year: {series.releaseYear}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendationsPage;
