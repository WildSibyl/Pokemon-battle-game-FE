import React, { useState, useEffect, useRef } from "react";
import { useBattle } from "../context/BattleContext";
import ScoreModalForm from "./ScoreModalForm";
import { createScore } from "../data/scores";
import ArenaEncounter from "./ArenaEncounter";
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
    modalOpen,
    setModalOpen,
    setLockArena,
  } = useBattle();

  const [hpStages, setHpStages] = useState([]);
  const [winnerSides, setWinnerSides] = useState([]);
  const containerRef = useRef(null);

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
      setLockArena(true); // lock before modal
      const timer = setTimeout(() => setModalOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [battleInProgress, battleResults, selectedRoster]);

  const resetBattle = () => {
    setBattleStarted(false);
    setBattleInProgress(false);
    setSelectedRoster([]);
    setOpponents([]);
    setBattleResults([]);
    setHpStages([]);
    setWinnerSides([]);
    setFinalScore(0);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Scroll to top
    }
  }, [selectedRoster]);
  console.log("Roster:", selectedRoster.length, "Opponents:", opponents.length);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl md:h-[calc(73vh)] border border-base-100 rounded-lg overflow-y-auto">
      <button
        onClick={() => {
          startBattle();
          setLockArena(true);
        }}
        disabled={
          selectedRoster.length === 0 ||
          selectedRoster.length !== opponents.length ||
          battleStarted ||
          battleInProgress
        }
        className="btn btn-primary absolute bottom-2 left-[43%] right-[43%] p-4 mx-auto text-xl font-semibold rounded-lg"
      >
        {battleInProgress ? "Battling..." : "Fight!"}
      </button>
      <div ref={containerRef} className="text-center w-full md:h-[calc(72vh)]">
        <div className="grid grid-cols-1 gap-5 w-full px-15 py-4">
          {selectedRoster.map((player, index) => (
            <ArenaEncounter
              key={index}
              player={player}
              opponent={opponents[index]}
              result={battleResults[index] || ""}
              hp={hpStages[index] ?? 100}
              winner={winnerSides[index]}
            />
          ))}
        </div>

        <ScoreModalForm
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            resetBattle();
            setLockArena(false); // unlock after modal
          }}
          score={finalScore}
          onSubmit={(username) => {
            createScore({ username, score: finalScore });
            console.log("Submitting score for", username);
            setModalOpen(false);
            resetBattle();
            setLockArena(false); // unlock after modal
          }}
        />
      </div>
    </div>
  );
};

export default Arena;
