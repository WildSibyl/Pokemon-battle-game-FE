import { useBattle } from "../context/BattleContext";

const Arena = () => {
  const { setBattleStarted } = useBattle();

  return (
    <div className="arena">
      <button
        onClick={() => setBattleStarted(true)}
        className="btn btn-primary"
      >
        Start Battle
      </button>
    </div>
  );
};

export default Arena;
