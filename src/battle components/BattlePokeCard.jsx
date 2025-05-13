import { useBattle } from "../context/BattleContext";

const RosterPokeCard = ({ pokemon }) => {
  const { selectedRoster, toggleSelection } = useBattle();
  const isSelected = selectedRoster.some((p) => p.name === pokemon.name);

  return (
    <div
      onClick={() => toggleSelection(pokemon)}
      className={`bg-base-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform cursor-pointer
        ${
          isSelected
            ? "border-4 border-yellow-400"
            : "border-2 border-transparent"
        }`}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
    </div>
  );
};

export default RosterPokeCard;
