import { motion } from "framer-motion";
import questionMark from "../assets/questionmark.png";
import { useBattle } from "../context/BattleContext";

const ArenaEncounter = ({ player, opponent, result, hp, winner }) => {
  const playerIsWinner = winner === "player";
  const opponentIsWinner = winner === "opponent";

  const { battleStarted } = useBattle();

  return (
    <div className="flex items-center justify-around gap-4 p-4 rounded-md bg-base-100 shadow-lg h-40">
      {/* Player */}
      <motion.div
        className="flex flex-col items-center mx-6"
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
        <span className="text-2xl mb-4">⚔️</span>
        <div className="w-24 h-3 bg-red-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: "100%" }}
            animate={{ width: `${hp}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <motion.div
          className="text-sm font-bold w-40 m-4 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={winner ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {result}
        </motion.div>
      </div>

      {/* Opponent (flip) */}
      <motion.div
        className="flex flex-col items-center overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: playerIsWinner ? 0.3 : 1,
          scale: playerIsWinner ? 0.9 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flip-card w-32 h-40 relative ${
            battleStarted ? "flipped" : ""
          }`}
        >
          <div className="flip-inner w-full h-full relative">
            {/* Front */}
            <div className="flip-front rounded-lg p-2 flex flex-col items-center justify-center">
              <img
                src={questionMark}
                alt="Mystery"
                className="w-24 h-24 object-contain mb-2"
              />
            </div>

            {/* Back */}
            <div
              className={`flip-back rounded-lg p-2 flex flex-col items-center justify-center ${
                playerIsWinner ? "opacity-30 scale-95" : ""
              }`}
            >
              {opponent ? (
                <>
                  <motion.img
                    src={opponent.image}
                    alt={opponent.name}
                    className="w-24 h-24 object-contain mb-2"
                    animate={opponentIsWinner ? { y: [0, -10, 0, -5, 0] } : {}}
                    transition={
                      opponentIsWinner
                        ? {
                            duration: 0.6,
                            repeat: Infinity,
                            repeatType: "loop",
                          }
                        : {}
                    }
                  />
                  <p className="font-semibold mt-1">{opponent.name}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArenaEncounter;
