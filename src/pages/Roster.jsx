import { useContext } from "react";
import { RosterContext } from "../context/RosterContext";
import RosterPokeCard from "../components/RosterPokeCard";

const Roster = () => {
  const { roster } = useContext(RosterContext); // Access roster from context

  console.log("Roster:", roster);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <p className="text-3xl font-bold m-4">
        Here are your Pokémon, ready for battle!
      </p>

      {roster.length === 0 ? (
        <p className="text-gray-500">No Pokémon in your roster yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {roster.map((pokemon) => (
            <RosterPokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Roster;
