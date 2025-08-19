import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Box,
} from "@mui/material";

type PollOption = {
  option: string;
  votes: number;
};

const defaultOptions: PollOption[] = [
  { option: "Books", votes: 0 },
  { option: "Movies", votes: 0 },
  { option: "TV Series", votes: 0 },
];

const Poll: React.FC = () => {
  const [selected, setSelected] = useState<string>("");
  const [results, setResults] = useState<PollOption[]>(defaultOptions);
  const [hasVoted, setHasVoted] = useState(false);

  // Fetch poll data from localStorage (placeholder, replace with API later)
  useEffect(() => {
    const stored = localStorage.getItem("pollResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const handleVote = () => {
    if (!selected) return;
    const updated = results.map((opt) =>
      opt.option === selected ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setResults(updated);
    localStorage.setItem("pollResults", JSON.stringify(updated));
    setHasVoted(true);
  };

  const totalVotes = results.reduce((a, b) => a + b.votes, 0);

  return (
    <Box maxWidth="600px" mx="auto" mt={5} p={2}>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            What content do you prefer?
          </Typography>

          {!hasVoted ? (
            <>
              <RadioGroup
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                {results.map((opt) => (
                  <FormControlLabel
                    key={opt.option}
                    value={opt.option}
                    control={<Radio />}
                    label={opt.option}
                  />
                ))}
              </RadioGroup>

              <Button
                variant="contained"
                color="primary"
                onClick={handleVote}
                disabled={!selected}
              >
                Submit Vote
              </Button>
            </>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom>
                Poll Results
              </Typography>
              {results.map((opt) => {
                const percentage =
                  totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                return (
                  <Box key={opt.option} mb={3}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">{opt.option}</Typography>
                      <Typography variant="body2">
                        {opt.votes} votes
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mt: 1,
                      }}
                    />
                  </Box>
                );
              })}

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setHasVoted(false)}
              >
                Vote Again
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Poll;
