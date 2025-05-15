import { useState, useEffect } from "react";
import { usePokemon } from "../hooks/usePokeData";
import { useBattle } from "../context/BattleContext";
import questionMark from "../assets/questionmark.png";

const getRandomId = () => Math.floor(Math.random() * 150) + 1; //min 1, max 1024

const RandomOpponent = ({ onReady }) => {
  // Generate the random ID only once on initial render
  const [pokeId] = useState(() => getRandomId());
  const { pokedata, loading, error } = usePokemon(pokeId);
  const { battleStarted, battleInProgress } = useBattle();

  useEffect(() => {
    if (pokedata && onReady) {
      const formatted = {
        name: pokedata.name,
        image: pokedata.sprites.other["official-artwork"].front_default,
        hp: pokedata.stats[0].base_stat,
        attack: pokedata.stats[1].base_stat,
        speed: pokedata.stats[5].base_stat,
      };
      onReady(formatted);
    }
  }, [pokedata]);

  if (loading) return <p>Loading opponent...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!pokedata) return null; // fallback safety

  return (
    <div
      className={`flip-card w-32 h-40 relative ${
        battleStarted ? "flipped" : ""
      }`}
    >
      <div className="flip-inner w-full h-full relative">
        {/* Front */}
        <div className="flip-front bg-base-100 rounded-lg p-2 flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
          <img
            src={questionMark}
            alt="Mystery"
            className="w-24 h-24 object-contain mb-2"
          />
        </div>
        {/* Back */}
        <div
          className={`flip-back rounded-lg p-2 flex flex-col items-center justify-center transform hover:scale-105 transition-transform ${
            battleInProgress ? "pointer-events-none bg-gray-300" : "bg-base-100"
          }`}
        >
          <img
            src={pokedata.sprites.other["official-artwork"].front_default}
            alt={pokedata.name}
            className="w-24 h-24 object-contain mb-2"
          />
          <h3 className="text-lg font-semibold capitalize">{pokedata.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default RandomOpponent;
