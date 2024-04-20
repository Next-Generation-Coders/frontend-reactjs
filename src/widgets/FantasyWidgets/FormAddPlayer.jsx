import React, { useEffect, useRef, useState } from "react";

function getPossiblePositions(pos) {
  switch (pos) {
    case "G":
      return ["GK"];
    case "D":
      return ["RB", "LB", "CB"];
    case "M":
      return ["CDM", "CM"];
    case "F":
      return ["RW", "ST", "LW"];
    default:
      return ["GK"];
  }
}
export function FormAddPlayer({ player, lineUp, onAddPlayer, onCancel }) {
  const [step, setStep] = useState(1);
  const { current: positions } = useRef(getPossiblePositions(player.position));
  const [selectedPos, setSelectedPos] = useState("");
  const [playersToReplace, setPlayersToReplace] = useState([]);
  function handleSelectPos(pos) {
    setSelectedPos(pos);
    setStep(2);
  }

  useEffect(() => {
    if (step === 2) {
      const isThereEmptyPos = lineUp.some(
        (p) => p.pos === selectedPos && !p.player
      );
      if (isThereEmptyPos) {
        setPlayersToReplace([]);
        return;
      }
      const players = lineUp.filter((p) => p.pos === selectedPos && p.player);
      setPlayersToReplace(players);
    }
  }, [step, selectedPos, lineUp]);

  return (
    <form className="form-add-player">
      {step !== 1 && (
        <span
          className="before-arrow arrow"
          onClick={() => setStep((s) => s - 1)}
        >
          &#8678;
        </span>
      )}

      <div id="steps">
        <div
          className={`step ${step === 1 ? "active" : "done"}`}
          data-desc="Picking position"
        >
          1
        </div>
        <div
          className={`step ${step === 2 ? "active" : ""}`}
          data-desc="Confirm"
        >
          2
        </div>
      </div>
      {step === 1 && (
        <>
          <p>Select {player.name} as:</p>
          <div className="positions">
            {positions.map((pos) => (
              <div
                key={pos}
                onClick={(e) => {
                  handleSelectPos(pos);
                }}
              >
                {pos}
              </div>
            ))}
          </div>
        </>
      )}
      {step === 2 && playersToReplace.length === 0 && (
        <p>
          Playing {player.name} as your {selectedPos} ?
        </p>
      )}
      {step === 2 && playersToReplace.length === 1 && (
        <p>
          Replace {playersToReplace[0].player["name_short"]} by {player.name}?
        </p>
      )}
      {step === 2 && playersToReplace.length <= 1 && (
        <div className="confirmation">
          <div
            onClick={() =>
              onAddPlayer(selectedPos, player, playersToReplace[0]?.player.id)
            }
          >
            Confrim
          </div>
          <div onClick={onCancel}>Cancel</div>
        </div>
      )}
      {step === 2 && playersToReplace.length === 2 && (
        <>
          <p>Replace {player.name} with </p>
          <div className="confirmation-players">
            {playersToReplace.map((p, i) => (
              <div
                onClick={() => onAddPlayer(selectedPos, player, p.player.id)}
                key={i}
              >
                {p.player["name_short"]}
              </div>
            ))}
          </div>
        </>
      )}
    </form>
  );
}
