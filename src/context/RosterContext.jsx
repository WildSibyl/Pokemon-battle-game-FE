import { createContext, useContext, useState, useEffect } from "react";

const RosterContext = createContext();

export const RosterProvider = ({ children }) => {
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
          pokemon.sprites.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default,
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
    setRoster((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleRoster = (pokemon) => {
    if (roster.some((p) => p.id === pokemon.id)) {
      removeFromRoster(pokemon.id);
    } else {
      addToRoster(pokemon);
    }
  };

  const isInRoster = (id) => roster.some((p) => p.id === id);

  return (
    <RosterContext.Provider
      value={{
        roster,
        addToRoster,
        removeFromRoster,
        toggleRoster,
        isInRoster,
      }}
    >
      {children}
    </RosterContext.Provider>
  );
};

export const useLocalStorage = () => useContext(RosterContext);
