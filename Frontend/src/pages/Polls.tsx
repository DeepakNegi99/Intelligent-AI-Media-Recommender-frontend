import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type PollOption = {
  option: string;
  votes: number;
};

const defaultOptions: PollOption[] = [
  { option: "Books", votes: 0 },
  { option: "Movies", votes: 0 },
  { option: "TV Series", votes: 0 },
];

const Poll = () => {
  const [selected, setSelected] = useState<string>("");
  const [results, setResults] = useState<PollOption[]>(defaultOptions);
  const [hasVoted, setHasVoted] = useState(false);

  // Fetch poll data (placeholder logic, replace with API later)
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

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card className="shadow-xl">
        <CardContent className="space-y-6 py-6">
          <h2 className="text-2xl font-bold">What content do you prefer?</h2>

          {!hasVoted ? (
            <>
              <RadioGroup onValueChange={setSelected}>
                {results.map((opt) => (
                  <div key={opt.option} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.option} id={opt.option} />
                    <Label htmlFor={opt.option}>{opt.option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleVote} disabled={!selected}>
                Submit Vote
              </Button>
            </>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">Poll Results</h3>
              {results.map((opt) => (
                <div key={opt.option} className="mb-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{opt.option}</span>
                    <span>{opt.votes} votes</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.max(
                          (opt.votes /
                            results.reduce((a, b) => a + b.votes, 0)) *
                            100 || 0,
                          5
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button className="mt-4" onClick={() => setHasVoted(false)}>
                Vote Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Poll;
