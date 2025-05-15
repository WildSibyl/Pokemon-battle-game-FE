import React, { useState, useEffect, useRef } from "react";
import { useBattle } from "../context/BattleContext";
import OpponentRow from "./OpponentRow";
import { motion } from "framer-motion";
import ScoreModalForm from "./ScoreModalForm";
import { createScore } from "../data/scores";

const Arena = () => {
  const {
    selectedRoster,
    opponents,
    setOpponents,
    battleResults,
    setBattleResults,
    finalScore,
    setFinalScore,
    battleInProgress,
    setBattleInProgress,
    battleStarted,
    setBattleStarted,
    setSelectedRoster,
  } = useBattle();

  const [hpStages, setHpStages] = useState([]);

  const [winnerSides, setWinnerSides] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const startBattle = async () => {
    setBattleStarted(true);
    setBattleInProgress(true);
    setBattleResults([]);
    setHpStages([]);
    setWinnerSides([]);

    const results = [];
    let score = 0;
    let winStreak = 0;

    for (let i = 0; i < selectedRoster.length; i++) {
      const player = selectedRoster[i];
      const opponent = opponents[i];

      if (!opponent) {
        results.push("No opponent found");
        setWinnerSides((prev) => [...prev, "tie"]);
        continue;
      }

      const playerPower = player.hp + player.attack + player.speed;
      const opponentPower = opponent.hp + opponent.attack + opponent.speed;

      // Animate HP stages
      const updatedHP = [...hpStages];
      updatedHP[i] = 50;
      setHpStages(updatedHP);
      await new Promise((res) => setTimeout(res, 600));

      updatedHP[i] = 0;
      setHpStages([...updatedHP]);
      await new Promise((res) => setTimeout(res, 600));

      if (playerPower > opponentPower) {
        results.push(`${player.name} wins! 🎉`);
        setWinnerSides((prev) => [...prev, "player"]);
        winStreak += 1;
        score += 100 + (winStreak - 1) * 25;
        //toast.success(`+${score} points!`);
      } else if (playerPower < opponentPower) {
        results.push(`${opponent.name} wins! 😞`);
        setWinnerSides((prev) => [...prev, "opponent"]);
        winStreak = 0;
        score += 25;
        //toast.success(`+${score} points!`);
      } else {
        results.push(`It's a tie between ${player.name} and ${opponent.name}`);
        setWinnerSides((prev) => [...prev, "tie"]);
        winStreak = 0;
        score += 50;
        //toast.success(`+${score} points!`);
      }
    }

    setFinalScore(score);

    setBattleResults(results);
    setBattleInProgress(false);
  };

  useEffect(() => {
    const allBattlesComplete =
      !battleInProgress &&
      selectedRoster.length > 0 &&
      battleResults.length === selectedRoster.length;

    if (allBattlesComplete) {
      const timer = setTimeout(() => {
        setModalOpen(true);
      }, 2000); // 2-second delay

      return () => clearTimeout(timer); // Cleanup on unmount or rerun
    }
  }, [battleInProgress, battleResults, selectedRoster]);

  //clean the arena when the modal closes
  const prevModalOpenRef = useRef();

  useEffect(() => {
    if (prevModalOpenRef.current && !modalOpen) {
      // Modal just closed
      setBattleStarted(false);
      setSelectedRoster([]);
      setOpponents([]);
    }
    prevModalOpenRef.current = modalOpen;
  }, [modalOpen]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Battle Arena</h2>

      <div className="grid grid-cols-1 gap-6">
        {selectedRoster.map((player, index) => {
          const opponent = opponents[index];
          const result = battleResults[index] || "";
          const hp = hpStages[index] ?? 100;
          const winner = winnerSides[index];

          const playerIsWinner = winner === "player";
          const opponentIsWinner = winner === "opponent";
          const isTie = winner === "tie";

          return (
            <div
              key={index}
              className="flex items-center justify-around gap-4 border p-4 rounded-md bg-base-100 shadow-lg"
            >
              {/* Player Side */}
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

              {/* Opponent Side */}
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
                      animate={
                        opponentIsWinner ? { y: [0, -10, 0, -5, 0] } : {}
                      }
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
              </motion.div>

              {/* Result Text */}
              <div className="text-sm font-medium w-40 text-left">{result}</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={startBattle}
        disabled={
          selectedRoster.length === 0 ||
          selectedRoster.length !== opponents.length ||
          battleStarted ||
          battleInProgress
        }
        className="btn btn-primary mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {battleInProgress ? "Battling..." : "Fight!"}
      </button>
      <ScoreModalForm
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setBattleStarted(false);
        }}
        score={finalScore}
        onSubmit={(username) => {
          createScore({ username, score: finalScore });
          console.log("Submitting score for", username);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Arena;
