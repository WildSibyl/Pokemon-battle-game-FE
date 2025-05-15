import { Link } from "react-router";
import ToggleRoster from "./ToggleRoster.jsx";

const RosterPokeCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon-details/${pokemon.id}`}>
      <div className="bg-base-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-50 h-50 object-contain mb-2"
        />
        <div className="flex w-full justify-between">
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          <ToggleRoster pokemon={pokemon} />
        </div>
        <p className="text-sm text-gray-500">{pokemon.type}</p>
        <div className="mt-2 text-sm text-center">
          <p className="">Strongest: {pokemon.strongestStat.toUpperCase()}</p>
          <p className="">Role: {pokemon.role}</p>
          <p className="">Base Stat Total: {pokemon.baseStatTotal}</p>
        </div>
      </div>
    </Link>
  );
};

export default RosterPokeCard;
