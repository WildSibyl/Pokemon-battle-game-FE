import { useBattle } from "../context/BattleContext";
import RandomOpponent from "./RandomOpponent";

const OpponentRow = () => {
  const { selectedRoster } = useBattle();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {selectedRoster.map((_, index) => (
        <RandomOpponent key={index} />
      ))}
    </div>
  );
};

export default OpponentRow;
