//Get the API URL from .env
const API_URL = import.meta.env.VITE_APP_POKEMON_BATTLE_API_URL;

if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");

const baseURL = `${API_URL}/leaderboard`;

export const getScores = async () => {
  const res = await fetch(baseURL);

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while fetching the scores");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const createScore = async (formData) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();

    if (!errorData.error) {
      throw new Error("An error occurred while creating the score");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};
