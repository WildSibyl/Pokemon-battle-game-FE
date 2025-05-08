import { useState, useEffect } from "react";

export const useAllPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const data = await response.json();

        // Fetch full Pokémon data from each URL
        const fullPokemonData = await Promise.all(
          data.results.map(async (pokedata) => {
            const res = await fetch(pokedata.url);
            return await res.json(); // This will include sprites, stats, etc.
          })
        );

        setPokemon(fullPokemonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading, error };
};

export const usePokemon = (pokeId) => {
  const [pokedata, setPokeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoke = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeId}`
        );
        const pokedata = await response.json();
        setPokeData(pokedata);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoke();
  }, [pokeId]);

  return { pokedata, loading, error };
};
