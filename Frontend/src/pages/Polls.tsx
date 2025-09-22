import { useState } from "react";
import {
  Card, CardContent, Typography, Button, Radio, RadioGroup,
  FormControlLabel, LinearProgress, Box
} from "@mui/material";

const Poll = () => {
  const [selected, setSelected] = useState("");

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!poll) return <Typography>No poll found</Typography>;

  const handleVote = async () => {
    if (!selected) return;
    await votePoll({ id: poll.id, option: selected });
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={5} px={2}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {poll.question}
          </Typography>

          <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
            {poll.options.map((opt: any) => (
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

          <Box mt={4}>
            {poll.options.map((opt: any) => {
              const totalVotes = poll.options.reduce((a: number, b: any) => a + b.votes, 0);
              const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
              return (
                <Box key={opt.option} mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{opt.option}</Typography>
                    <Typography variant="body2">{opt.votes} votes</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 5 }} />
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Poll;
