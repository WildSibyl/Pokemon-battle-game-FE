import { Link } from "react-router";
import ToggleRoster from "./ToggleRoster.jsx";

const PokeCard = ({ pokemon, loadedPokemon }) => {
  const imageSrc =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Link to={`/pokemon-details/${pokemon.id}`}>
      <div
        className="bg-base-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform"
        data-pokemon-id={pokemon.id}
      >
        <img
          src={imageSrc}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4"
        />

        <div className="flex w-full justify-between">
          <h3 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h3>
          <ToggleRoster pokemon={pokemon} />
        </div>
      </div>
    </Link>
  );
};

export default PokeCard;
