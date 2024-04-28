import React from "react";
import { AvatarPlayer } from "./AvatarPlayer";

export function LineUpPlayers({ lineUp, onHoverPlayer, onRemovePlayer }) {
  function handleHoverPlayer(num) {
    onHoverPlayer(num + 1);
  }

  function handleLeavePlayer() {
    onHoverPlayer(0);
  }
  return (
    <>
      <div className="lineup-players">
        <h2 className="goal-keeper">Goalkeeper</h2>
        <AvatarPlayer
          p={lineUp[0]}
          onHover={() => handleHoverPlayer(0)}
          onLeave={handleLeavePlayer}
          onRemove={onRemovePlayer}
        />
        <h2 className="defender">Defenders</h2>
        {Array.from({ length: 4 }, (_, i) => (
          <AvatarPlayer
            p={lineUp[i + 1]}
            key={i}
            onHover={() => handleHoverPlayer(i + 1)}
            onLeave={handleLeavePlayer}
            onRemove={onRemovePlayer}
          />
        ))}
      </div>
      <div className="lineup-players">
        <h2 className="midfielder">Midfielders</h2>
        {Array.from({ length: 3 }, (_, i) => (
          <AvatarPlayer
            p={lineUp[i + 5]}
            key={i}
            onHover={() => handleHoverPlayer(i + 5)}
            onLeave={handleLeavePlayer}
            onRemove={onRemovePlayer}
          />
        ))}
        <h2 className="forward">Forwards</h2>
        {Array.from({ length: 3 }, (_, i) => (
          <AvatarPlayer
            p={lineUp[i + 8]}
            key={i}
            onHover={() => handleHoverPlayer(i + 8)}
            onLeave={handleLeavePlayer}
            onRemove={onRemovePlayer}
          />
        ))}
      </div>
    </>
  );
}
