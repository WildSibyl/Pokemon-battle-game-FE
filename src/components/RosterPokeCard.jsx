import { Link } from "react-router";
import ToggleRoster from "./ToggleRoster.jsx";

const RosterPokeCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon-details/${pokemon.id}`}>
      <div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain mb-2"
        />
        <div className="flex w-full justify-between">
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          <ToggleRoster pokemon={pokemon} />
        </div>
        <p className="text-sm text-gray-500">{pokemon.type}</p>
        <div className="mt-2 text-sm text-center">
          {/* <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Speed: {pokemon.speed}</p> */}
          <p className="">Strongest: {pokemon.strongestStat.toUpperCase()}</p>
          <p className="">Role: {pokemon.role}</p>
          <p className="">Base Stat Total: {pokemon.baseStatTotal}</p>
        </div>
      </div>
    </Link>
  );
};

export default RosterPokeCard;
