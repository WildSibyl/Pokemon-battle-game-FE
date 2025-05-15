const LeaderboardScore = ({ username, score, position }) => {
  const background =
    position === 1
      ? "bg-yellow-500"
      : position === 2
      ? "bg-gray-500"
      : position === 3
      ? "bg-orange-500"
      : "bg-base-100";

  const medal =
    position === 1 ? "🥇" : position === 2 ? "🥈" : position === 3 ? "🥉" : "";

  return (
    <div
      className={`flex items-center justify-between w-full max-w-2xl p-4 m-2 bg-base-100 rounded-lg shadow-md ${background}`}
    >
      <div className="text-xl font-samibold mx-2">{position}</div>
      <div className="mx-2 w-4">{medal}</div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-samibold px-4">{username}</h2>
        <p className="text-2xl font-samibold px-4">{score}</p>
      </div>
    </div>
  );
};

export default LeaderboardScore;
