import React from "react";
import { useOutletContext } from "react-router";
import PokeCard from "../components/PokeCard";
import { useAllPokemon } from "../hooks/usePokeData";

const Home = () => {
  const { pokemon, loading, error } = useAllPokemon();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(pokemon);

  return (
    <div className="container mx-auto pb-4">
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-3xl font-bold mb-4">Choose your Pokémon!</h1>
      </div>
      <div
        id="cart-container"
        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {pokemon.map((pokedata) => (
          <PokeCard key={pokedata.name} pokemon={pokedata} />
        ))}
      </div>
    </div>
  );
};

export default Home;
