import { useEffect, useState, useRef } from "react";
import { getScores } from "../data/scores";
import LeaderboardScore from "../components/LeaderboardScore";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Scroll to top
    }
  }, [scores]);

  if (loading) return <p className="text-lg">Loading leaderboard...</p>;

  const leaderboard = scores.sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold m-4 mb-8">Top players</h1>
      <div className="flex flex-col items-center w-full max-w-4xl md:h-[calc(70vh)] border border-base-100 rounded-lg overflow-y-auto">
        {leaderboard.map((score, index) => (
          <LeaderboardScore key={score._id} {...score} position={index + 1} />
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
