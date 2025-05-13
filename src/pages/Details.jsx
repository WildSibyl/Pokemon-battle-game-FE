import { useParams } from "react-router";
import { usePokemon } from "../hooks/usePokeData";
import ToggleRoster from "../components/ToggleRoster";

const PokemonDetails = () => {
  const { id } = useParams();
  const { pokedata, loading, error } = usePokemon(id);

  if (loading) return <p className="text-center mt-10">Loading Pokémon...</p>;
  if (error || !pokedata)
    return <p className="text-center mt-10">Failed to load Pokémon data.</p>;

  const image =
    pokedata.sprites.other?.["official-artwork"]?.front_default ||
    pokedata.sprites.front_default;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold capitalize">{pokedata.name}</h2>
        <ToggleRoster pokemon={pokedata} />
      </div>

      <img
        src={image}
        alt={pokedata.name}
        className="w-full h-64 object-contain mb-4"
      />

      <p className="mb-2">
        <strong>Type:</strong>{" "}
        {pokedata.types.map((t) => t.type.name).join(", ")}
      </p>
      <p className="mb-2">
        <strong>Abilities:</strong>{" "}
        {pokedata.abilities.map((a) => a.ability.name).join(", ")}
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
        <p>
          <strong>HP:</strong> {pokedata.stats[0].base_stat}
        </p>
        <p>
          <strong>Attack:</strong> {pokedata.stats[1].base_stat}
        </p>
        <p>
          <strong>Defense:</strong> {pokedata.stats[2].base_stat}
        </p>
        <p>
          <strong>Speed:</strong> {pokedata.stats[5].base_stat}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;
