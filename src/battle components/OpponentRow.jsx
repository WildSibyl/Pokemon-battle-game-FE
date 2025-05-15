import { useBattle } from "../context/BattleContext";
import RandomOpponent from "./RandomOpponent";

const OpponentRow = () => {
  const { selectedRoster, opponents, setOpponents } = useBattle();
  //const [opponents, setOpponents] = useState([]);

  const handleOpponentReady = (index, opponentData) => {
    setOpponents((prev) => {
      const newOpponents = [...prev];
      newOpponents[index] = opponentData;
      return newOpponents;
    });
  };

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
