import { motion } from "framer-motion";

const BattleRow = ({ player, opponent, result, hp, winner }) => {
  const playerIsWinner = winner === "player";
  const opponentIsWinner = winner === "opponent";

  return (
    <div className="flex items-center justify-around gap-4 border p-4 rounded-md bg-base-100 shadow-lg">
      {/* Player */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: opponentIsWinner ? 0.3 : 1,
          scale: opponentIsWinner ? 0.9 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={player.image}
          alt={player.name}
          className="h-20"
          animate={playerIsWinner ? { y: [0, -10, 0, -5, 0] } : {}}
          transition={
            playerIsWinner
              ? { duration: 0.6, repeat: Infinity, repeatType: "loop" }
              : {}
          }
        />
        <p className="font-semibold mt-1">{player.name}</p>
      </motion.div>

      <div className="flex flex-col items-center">
        <span className="text-2xl mb-2">⚔️</span>
        <div className="w-24 h-3 bg-red-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: "100%" }}
            animate={{ width: `${hp}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Opponent */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: playerIsWinner ? 0.3 : 1,
          scale: playerIsWinner ? 0.9 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {opponent ? (
          <>
            <motion.img
              src={opponent.image}
              alt={opponent.name}
              className="h-20"
              animate={opponentIsWinner ? { y: [0, -10, 0, -5, 0] } : {}}
              transition={
                opponentIsWinner
                  ? { duration: 0.6, repeat: Infinity, repeatType: "loop" }
                  : {}
              }
            />
            <p className="font-semibold mt-1">{opponent.name}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </motion.div>

      <div className="text-sm font-medium w-40 text-left">{result}</div>
    </div>
  );
};

export default BattleRow;
