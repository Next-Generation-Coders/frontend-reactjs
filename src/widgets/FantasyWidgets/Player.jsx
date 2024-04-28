import React from "react";
import defaultLogo from "../../assets/fantasyAssets/football-logo.png"
function getPosition(pos) {
  switch (pos) {
    case "G":
      return "GK";
    case "D":
      return "DEF";
    case "M":
      return "MID";
    case "F":
      return "FWD";
    default:
      return "GK";
  }
}
export function getCountryCode(country) {
  return country.toLowerCase().slice(0, 2);
}
export function Player({ player, onSelectPlayer }) {
  const abilities = player.ability;

  return (
    <div className="player" onClick={() => onSelectPlayer(player)}>
      <div className="player-info-image">
        <div className="player-info">
          <p>{player.rating}</p>
          <p>{getPosition(player.position)}</p>
          {player["nationality_code"] && (
            <img
              src={`https://flagcdn.com/48x36/${getCountryCode(
                player["nationality_code"]
              )}.png`}
              alt={player.flag}
            />
          )}
        </div>
        {player.has_photo ? (
          <img src={player.photo} alt={player.name} />
        ) : (
          <img src={defaultLogo} alt="default" />
        )}
      </div>
      <h1 className="player-name">{player.name}</h1>
      <hr />
      <div className="player-rating">
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <p key={`${player.name}${i}`}>
              {abilities[i].name}: {abilities[i].value}
            </p>
          ))}
        </div>
        <div>
          {Array.from({ length: 2 }, (_, i) => (
            <p key={`${player.name}${i + 2}`}>
              {abilities[i + 2].name}: {abilities[i + 2].value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
