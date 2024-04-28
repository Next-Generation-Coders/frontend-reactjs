import React from "react";

export function Stats({ stats }) {
  const { bestPlayer, worstPlayer, team } = stats;
  return (
    <div className="stats">
      <p>Team: {team.toFixed(2)}</p>

      <p>
        Best Player:
        {bestPlayer &&
          `   ${bestPlayer.player.name} | ${bestPlayer.pos} |
          ${bestPlayer.player.rating}`}
      </p>

      <p>
        Worst Player:
        {worstPlayer &&
          `   ${worstPlayer.player.name} | ${worstPlayer.pos} |
          ${worstPlayer.player.rating}`}
      </p>
    </div>
  );
}
