import { useEffect, useState } from "react";
import { getScores } from "../data/scores";
import LeaderboardScore from "../components/LeaderboardScore";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const scores = await getScores();
        setScores(scores);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-lg">Loading leaderboard...</p>;

  const leaderboard = scores.sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold m-4">Top players</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        {leaderboard.map((score, index) => (
          <LeaderboardScore key={score._id} {...score} position={index + 1} />
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
