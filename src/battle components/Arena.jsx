import { useBattle } from "../context/BattleContext";
import OpponentRow from "./OpponentRow";

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
