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
      const stats = pokemon.stats.map((s) => s.base_stat);
      const statMap = {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
      };

      // Determine which stat is the strongest
      const strongestCoreStat = Object.entries(statMap).reduce((max, entry) =>
        entry[1] > max[1] ? entry : max
      )[0]; // returns the name, like "hp" or "attack"

      const baseStatTotal = stats.reduce((acc, val) => acc + val, 0);

      const role = (() => {
        if (statMap.hp >= 100 && statMap.defense >= 90) return "Tank";
        if (statMap.speed >= 100 && statMap.attack >= 90)
          return "Physical Sweeper";
        if (statMap.speed >= 100 && statMap["special-attack"] >= 90)
          return "Special Sweeper";
        if (statMap.hp <= 60 && statMap.defense <= 60) return "Glass Cannon";
        return "Balanced";
      })();

      const strongestStat = pokemon.stats.reduce((max, stat) =>
        stat.base_stat > max.base_stat ? stat : max
      ).stat.name;

      const formatted = {
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default,
        type: pokemon.types.map((type) => type.type.name).join(", "),
        hp: statMap.hp,
        attack: statMap.attack,
        defense: statMap.defense,
        speed: statMap.speed,
        strongestStat: strongestCoreStat,
        baseStatTotal,
        role,
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

export { RosterContext };

export const useRoster = () => useContext(RosterContext);
