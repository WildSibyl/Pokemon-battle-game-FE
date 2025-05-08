import React from "react";
import { Link } from "react-router";
import pokeballIcon from "../assets/pokeball.png";

const Navbar = () => {
  return (
    <nav className="nav flex justify-between items-center bg-base-200 h-[50px] sticky top-0 z-10 shadow-md mb-4">
      <Link to="/">
        <div className="active flex font-bold text-center pr-3 hover:bg-red-300">
          <img
            className="h-[50px] p-3"
            src={pokeballIcon}
            alt="pokeball icon"
          />
          <h3 className="align-middle self-center">PokéBattle</h3>
        </div>
      </Link>
      <Link to="/pokemon-roster">
        <div className="active flex font-bold pr-3 hover:bg-red-300">
          <img
            className="h-[50px] p-3"
            src={pokeballIcon}
            alt="pokeball icon"
          />
          <h3 className="align-middle self-center">My Roster</h3>
        </div>
      </Link>
      <Link to="/battle">
        <div className="active flex font-bold pr-3 hover:bg-red-300">
          <img
            className="h-[50px] p-3"
            src={pokeballIcon}
            alt="pokeball icon"
          />
          <h3 className="align-middle self-center">Battle!</h3>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
