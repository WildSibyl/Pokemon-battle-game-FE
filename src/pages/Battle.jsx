import BattlePokeCard from "../battle components/BattlePokeCard";
import { useContext, useEffect } from "react";
import { RosterContext } from "../context/RosterContext";
import { BattleProvider } from "../context/BattleContext";
import OpponentRow from "../battle components/OpponentRow";
import Arena from "../battle components/Arena";

const Battle = () => {
  const { roster } = useContext(RosterContext); // Access roster from context

  return (
    <BattleProvider>
      <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-4">
        <div className="flex flex-col items-center mb-4 md:w-[25%] md:h-[calc(80vh)] border border-base-100 rounded-lg p-4 overflow-y-auto">
          <p className="text-lg mb-4">Choose your Pokémon!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {roster.map((pokemon) => (
              <BattlePokeCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
        <div className="relative flex flex-col items-center mb-4 md:w-[50%] md:h-[calc(80vh)] rounded-lg overflow-y-auto">
          <Arena />
        </div>
        <div className="flex flex-col items-center mb-4 md:w-[25%] md:h-[calc(80vh)] border border-base-100 rounded-lg p-4 overflow-y-auto">
          <p className="text-lg mb-4">Your opponents:</p>
          <OpponentRow />
        </div>
      </div>
    </BattleProvider>
  );
};

export default Battle;
