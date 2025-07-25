import React, { useState } from "react";
import { Box, Button, TextField, Typography, Chip } from "@mui/material";
import axios from "axios";
import AdminLogin from "./AdminLogin";

const Admin: React.FC = () => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [mood, setMood] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [type, setType] = useState<"books" | "movies" | "tvseries">("books");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);


  const handleUpload = async () => {
    const payload = {
      title,
      genres: genres.split(",").map((g) => g.trim()),
      mood,
      platforms: platforms.split(",").map((p) => p.trim()),
    };

    try {
      const res = await axios.post(
        `http://localhost:12046/admin/upload-csv/${type}`,
        payload
      );
      setMessage(res.data);
    } catch (err: any) {
      setMessage(err.response?.data || "Upload failed.");
    }
  };

  if (!token) return <AdminLogin onLogin={setToken} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Admin Content Uploader
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Genres (comma-separated)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Platforms (comma-separated)"
        value={platforms}
        onChange={(e) => setPlatforms(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Chip
          label="Book"
          color={type === "books" ? "primary" : "default"}
          onClick={() => setType("books")}
        />
        <Chip
          label="Movie"
          color={type === "movies" ? "primary" : "default"}
          onClick={() => setType("movies")}
        />
        <Chip
          label="TV Series"
          color={type === "tvseries" ? "primary" : "default"}
          onClick={() => setType("tvseries")}
        />
      </Box>

      <Button variant="contained" onClick={handleUpload}>
        Upload {type}
      </Button>

      {message && (
        <Typography sx={{ mt: 2 }} color="secondary">
          {message}
        </Typography>
      )}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          axios
            .post(`http://localhost:12046/admin/upload-csv/${type}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => setMessage(res.data))
            .catch((err) => setMessage("Upload failed: " + err.message));
        }}
      />
    </Box>
  );
};

export default Admin;
