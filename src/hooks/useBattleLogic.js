import { useState } from "react";

export const useBattleLogic = ({
  selectedRoster,
  opponents,
  setBattleStarted,
  setBattleResults,
  setFinalScore,
  setBattleInProgress,
  setWinnerSides,
  setHpStages,
}) => {
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

      const updatedHP = Array.from({ length: selectedRoster.length }).fill(100);
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
      } else if (playerPower < opponentPower) {
        results.push(`${opponent.name} wins! 😞`);
        setWinnerSides((prev) => [...prev, "opponent"]);
        winStreak = 0;
        score += 25;
      } else {
        results.push(`It's a tie between ${player.name} and ${opponent.name}`);
        setWinnerSides((prev) => [...prev, "tie"]);
        winStreak = 0;
        score += 50;
      }
    }

    setFinalScore(score);
    setBattleResults(results);
    setBattleInProgress(false);
  };

  return { startBattle };
};
