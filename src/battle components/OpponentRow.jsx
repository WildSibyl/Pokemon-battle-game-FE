import { useState, useEffect } from "react";
import { useModalCleanup } from "../hooks/useModalCleanup";
import { useBattle } from "../context/BattleContext";
import RandomOpponent from "./RandomOpponent";

const OpponentRow = () => {
  const handleOpponentReady = (index, opponentData) => {
    setOpponents((prev) => {
      const newOpponents = [...prev];
      newOpponents[index] = opponentData;
      return newOpponents;
    });
  };

  const {
    selectedRoster,
    opponents,
    setOpponents,
    battleResults,
    battleInProgress,
    setBattleStarted,
    setSelectedRoster,
  } = useBattle();

  const [hpStages, setHpStages] = useState([]);
  const [winnerSides, setWinnerSides] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {selectedRoster.map((_, index) => (
        <RandomOpponent
          key={index}
          onReady={(data) => handleOpponentReady(index, data)}
        />
      ))}
    </div>
  );
};

export default OpponentRow;
