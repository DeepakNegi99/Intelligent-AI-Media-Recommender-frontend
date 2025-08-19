// src/pages/HomePage.tsx
import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-banner.jpg"; // Add your image to assets folder

// inside HomePage component

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  //const { toggleTheme, darkMode } = useThemeContext();

  // Example of engagement tracking (simple console log or analytics call)
  React.useEffect(() => {
    console.log("Home page visited");
    // sendAnalyticsEvent('page_view', { page: 'home' });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "200px", sm: "300px", md: "400px" },
            borderRadius: 2,
            boxShadow: 3,
            mb: 4,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Welcome to AI Recommender
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Get personalized recommendations for books, movies, and TV shows
            based on your preferences and voting behavior.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={4}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/polls")}
            >
              Vote Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/questionnaire")}
            >
              Set Preferences
            </Button>
            <Button variant="text" onClick={() => navigate("/recommendations")}>
              View Recommendations
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Container>
  );
};

export default HomePage;
