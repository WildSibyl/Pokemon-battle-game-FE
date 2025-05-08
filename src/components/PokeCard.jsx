import { Link } from "react-router";
import React, { useState, useEffect } from "react";
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

        <p className=" mb-2">
          Type: {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4 ">
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <p>Defense: {pokemon.stats[2].base_stat}</p>
          <p>Speed: {pokemon.stats[5].base_stat}</p>
        </div>
      </div>
    </Link>
  );
};

export default PokeCard;
