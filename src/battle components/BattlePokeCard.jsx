import { useBattle } from "../context/BattleContext";

const RosterPokeCard = ({ pokemon }) => {
  const { selectedRoster, toggleSelection, lockArena } = useBattle();
  const isSelected = selectedRoster.some((p) => p.name === pokemon.name);

  return (
    <div
      onClick={() => toggleSelection(pokemon)}
      disabled={lockArena}
      className={`w-32 h-40 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform cursor-pointer
        ${
          lockArena
            ? "pointer-events-none bg-gray-300"
            : isSelected
            ? "bg-yellow-500"
            : "bg-base-100"
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
