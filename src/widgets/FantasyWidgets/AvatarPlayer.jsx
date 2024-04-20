import React from "react";
import { getCountryCode } from "./Player";
import defaultImage from "../../assets/fantasyAssets/default-image.jpg"
import crossImage from "../../assets/fantasyAssets/cross.png"
export function AvatarPlayer({ p, onHover, onLeave, onRemove }) {
  let { pos, player } = p;
  player = player || {
    name: "",
    rating: "",
   
  };
  return (
    <div
      className="avatar-player"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {player.name && (
        <img
          className="cross"
          src={crossImage}
          alt="cross"
          onClick={() => onRemove(player.id)}
        />
      )}

<img
  className="avatar-player-image"
  src={player.photo || defaultImage}
  alt={player.name}
/>
      <div className="player-info">
        <p>
          {player.name}
          {player.name && (
            <img
              src={`https://flagcdn.com/48x36/${getCountryCode(
                player["nationality_code"]
              )}.png`}
              alt={player.flag}
            />
          )}
        </p>
        <p>
          {player.rating && `${player.rating} Rating | `}
          {pos}
        </p>
      </div>
    </div>
  );
}
