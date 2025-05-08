import { useState, useEffect } from "react";

export const useLocalStorage = () => {
  const [roster, setRoster] = useState(() => {
    return JSON.parse(localStorage.getItem("pokeRoster")) || [];
  });

  useEffect(() => {
    localStorage.setItem("pokeRoster", JSON.stringify(roster));
  }, [roster]);

  const addToRoster = (pokemon) => {
    if (!roster.some((p) => p.id === pokemon.id)) {
      const formatted = {
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default,
        type: pokemon.types.map((type) => type.type.name).join(", "),
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
      };
      setRoster([...roster, formatted]);
    }
  };

  const removeFromRoster = (id) => {
    const updated = roster.filter((p) => p.id !== id);
    setRoster(updated);
  };

  const toggleRoster = (pokemon) => {
    roster.some((p) => p.id === pokemon.id)
      ? removeFromRoster(pokemon.id)
      : addToRoster(pokemon);
  };

  const isInRoster = (id) => {
    return roster.some((p) => p.id === id);
  };

  return { roster, addToRoster, removeFromRoster, toggleRoster, isInRoster };
};
