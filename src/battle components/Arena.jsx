import React, { useState, useEffect } from "react";
import { useBattle } from "../context/BattleContext";
import ScoreModalForm from "./ScoreModalForm";
import { createScore } from "../data/scores";
import BattleMatch from "./BattleMatch";
import { useBattleLogic } from "../hooks/useBattleLogic";
import { useModalCleanup } from "../hooks/useModalCleanup";

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

  const { startBattle } = useBattleLogic({
    selectedRoster,
    opponents,
    setBattleStarted,
    setBattleResults,
    setFinalScore,
    setBattleInProgress,
    setWinnerSides,
    setHpStages,
  });

  useModalCleanup(modalOpen, () => {
    setBattleStarted(false);
    setSelectedRoster([]);
    setOpponents([]);
  });

  useEffect(() => {
    const allBattlesComplete =
      !battleInProgress &&
      selectedRoster.length > 0 &&
      battleResults.length === selectedRoster.length;

    if (allBattlesComplete) {
      const timer = setTimeout(() => setModalOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [battleInProgress, battleResults, selectedRoster]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Battle Arena</h2>

      <div className="grid grid-cols-1 gap-6">
        {selectedRoster.map((player, index) => (
          <BattleMatch
            key={index}
            player={player}
            opponent={opponents[index]}
            result={battleResults[index] || ""}
            hp={hpStages[index] ?? 100}
            winner={winnerSides[index]}
          />
        ))}
      </div>

      <button
        onClick={startBattle}
        disabled={
          selectedRoster.length === 0 ||
          selectedRoster.length !== opponents.length ||
          battleStarted ||
          battleInProgress
        }
        className="btn btn-primary mt-6"
      >
        {battleInProgress ? "Battling..." : "Fight!"}
      </button>

      <ScoreModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        score={finalScore}
        onSubmit={(username) => {
          createScore({ username, score: finalScore });
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Arena;
