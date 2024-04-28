import React from "react";
import defaultimage from "../../assets/fantasyAssets/default-image.jpg"
export function LineUpPlayer({ pos, num, player, isHovered }) {
  return (
    <div
      className={`lineup-player lineup-player${num} ${isHovered && " hover"}`}
    >
      {player ? (
        <img src={player.photo} alt={player["name_short"]} />
      ) : (
        <img src={defaultimage} alt="default" />
      )}
      <p>
        {pos}
        {player && `: ${player["name_short"]}`}
      </p>
    </div>
  );
}
