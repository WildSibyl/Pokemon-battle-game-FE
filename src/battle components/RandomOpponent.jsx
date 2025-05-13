import { useState } from "react";
import { usePokemon } from "../hooks/usePokeData";

const getRandomId = () => Math.floor(Math.random() * 15011) + 1; //min 1, max 1024

const RandomOpponent = () => {
  // Generate the random ID only once on initial render
  const [pokeId] = useState(() => getRandomId());
  const { pokedata, loading, error } = usePokemon(pokeId);

  if (loading) return <p>Loading opponent...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!pokedata) return null; // fallback safety

  const imageSrc =
    pokedata.sprites.other["official-artwork"].front_default ||
    pokedata.sprites.front_default;

  return (
    <div
      className="bg-base-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform"
      data-pokemon-id={pokedata.id}
    >
      <img
        src={imageSrc}
        alt={pokedata.name}
        className="w-full h-48 object-contain mb-4"
      />

      <div className="flex w-full justify-between">
        <h3 className="text-xl font-bold capitalize mb-2">{pokedata.name}</h3>
      </div>

      {/* <p className=" mb-2">
          Type: {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>

         <div className="grid grid-cols-2 gap-2 text-sm mb-4 ">
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <p>Defense: {pokemon.stats[2].base_stat}</p>
          <p>Speed: {pokemon.stats[5].base_stat}</p>
        </div> */}
    </div>
  );
};

export default RandomOpponent;
