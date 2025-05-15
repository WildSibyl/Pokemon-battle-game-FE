# PokéBattle 💥

A full-featured Pokédex-style FE web application built with **React**, **Tailwind CSS**, and the **PokéAPI**. Users can browse Pokémon, view their stats, add them to a personal roster (favorites), and prepare for battles.

---

## Features

✅ Browse 150 Pokémon  
✅ View detailed Pokémon stats  
✅ Add/Remove Pokémon from your roster (favorites)  
✅ Roster Data persisted with `localStorage`  
✅ Responsive design using Tailwind CSS  
✅ Modular and scalable component architecture

---

## Tech Stack

- **React** (with functional components & hooks)
- **React Router v6+**
- **Tailwind CSS** for styling
- **PokéAPI** for data fetching
- **localStorage** for state persistence
- **Context API** for global state (favorites/roster)

---

## Folder Structure

src/
├── assets/ # Pokémon icons and UI images
├── components/ # UI building blocks (Navbar, PokeCard, etc.)
├── context/ # RosterContext for global state
├── hooks/ # Custom hooks (e.g. usePokemon)
├── layout/ # MainLayout with Navbar + Footer
├── pages/ # Route views (Home, Roster, Details, Battle)
└── App.jsx # Router setup

## Instructions of use

clone the repository

npm i

create an .env file with

VITE_APP_POKEMON_BATTLE_API_URL=http://localhost:8080
