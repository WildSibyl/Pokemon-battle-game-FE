import { useContext, useState } from "react";
import imgUnstored from "../assets/favheartunselected.png";
import imgHoveredUnstored from "../assets/favhearthovered.png";
import imgStored from "../assets/favheartselected.png";
import { RosterContext } from "../context/RosterContext";

const ToggleRoster = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);
  const { toggleRoster, isInRoster } = useContext(RosterContext);
  const isFavorite = isInRoster(pokemon.id);

  return (
    <img
      src={isFavorite ? imgStored : hovered ? imgHoveredUnstored : imgUnstored}
      alt="Toggle Favorite"
      className="h-7 ml-4 cursor-pointer"
      onClick={(e) => {
        e.preventDefault(); // Prevent link navigation if wrapped in a link
        toggleRoster(pokemon);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

export default ToggleRoster;
