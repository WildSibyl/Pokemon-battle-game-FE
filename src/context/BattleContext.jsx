import React, { createContext, useContext, useState } from "react";

const BattleContext = createContext();

export const BattleProvider = ({ children }) => {
  const [selectedRoster, setSelectedRoster] = useState([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [battleResults, setBattleResults] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [battleInProgress, setBattleInProgress] = useState(false);

  const toggleSelection = (pokemon) => {
    setSelectedRoster((prev) => {
      const isSelected = prev.some((p) => p.name === pokemon.name);
      if (isSelected) {
        return prev.filter((p) => p.name !== pokemon.name);
      } else {
        return [...prev, pokemon];
      }
    });
  };

  return (
    <BattleContext.Provider
      value={{
        selectedRoster,
        setSelectedRoster,
        toggleSelection,
        battleStarted,
        setBattleStarted,
        opponents,
        setOpponents,
        battleResults,
        setBattleResults,
        finalScore,
        setFinalScore,
        battleInProgress,
        setBattleInProgress,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => useContext(BattleContext);
