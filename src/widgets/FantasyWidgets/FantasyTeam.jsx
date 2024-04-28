import React, { useState, useEffect } from "react";
import { Title } from "./Title";
import { Logo } from "./Logo";
import { Header } from "./Header";
// import data from "../data";
import { ListPlayers } from "./ListPlayers";
import { Player } from "./Player";
import { FormAddPlayer } from "./FormAddPlayer";
import { PopUp } from "./PopUp";
import { SearchForm } from "./SearchForm";
import { RightSide } from "./RightSide";
import { LeftSide } from "./LeftSide";
import { Main } from "./Main";
import { LineUpPlayer } from "./LineUpPlayer";
import { LineUpPhoto } from "./LineUpPhoto";
import { LineUpPlayers } from "./LineUpPlayers";
import { LineUp } from "./LineUp";
import { useFetchPlayers } from "./useFetchPlayers";
import { useLocalSotrage } from "./useLocalStorage";
import { Stats } from "./Stats";

const initialLineUp = [
  { pos: "GK", player: null },
  { pos: "RB", player: null },
  { pos: "LB", player: null },
  { pos: "CB", player: null },
  { pos: "CB", player: null },
  { pos: "CDM", player: null },
  { pos: "CM", player: null },
  { pos: "CM", player: null },
  { pos: "RW", player: null },
  { pos: "ST", player: null },
  { pos: "LW", player: null },
];
function FantasyTeam() {
  const { players, isLoading, error, fetchPlayers, setPlayers } =
    useFetchPlayers();
  const [lineUp, setLineUp] = useLocalSotrage("lineUp", initialLineUp);
  const [hoverPlayer, setHoverPlayer] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const team = lineUp.reduce(
    (acc, p) => acc + (p.player ? p.player.rating / 11 : 0),
    0
  );

  const bestPlayer = lineUp.reduce((bp, p) => {
    if (!bp && p.player) return p;
    if (!p.player) return bp;
    return p.player.rating > bp.player.rating ? p : bp;
  }, null);

  const worstPlayer = lineUp.reduce((wp, p) => {
    if (!wp && p.player) return p;
    if (!p.player) return wp;
    return p.player.rating < wp.player.rating ? p : wp;
  }, null);

  const stats = { bestPlayer, worstPlayer, team };
  console.log(stats);

  function addLineUpPlayer(pos, player, id) {
    setLineUp((lineUp) => {
      const isThereEmptyPos = lineUp.some((p) => p.pos === pos && !p.player);
      if (isThereEmptyPos) {
        let done = false;
        return lineUp.map((p) => {
          if (!done && p.pos === pos && !p.player) {
            done = true;
            return { pos, player };
          }
          return p;
        });
      }
      return lineUp.map((p) => {
        if (p.pos === pos && p.player.id === id) {
          return { pos, player };
        }
        return p;
      });
    });
    setSelectedPlayer(null);
  }
  function removeLineUpPlayer(id) {
    setLineUp((lineUp) => {
      return lineUp.map((p) => {
        if (p.player && p.player.id === id) {
          return { pos: p.pos, player: null };
        }
        return p;
      });
    });
  }
  function handleClosePopUp() {
    setSelectedPlayer(null);
  }

  useEffect(() => {
    setPlayers((players) => {
      return players.filter((player) => {
        return !lineUp.some((p) => p.player && p.player.id === player.id);
      });
    });
  }, [lineUp, setPlayers]);
  return (
    <>
      {selectedPlayer && (
        <PopUp onCancel={handleClosePopUp}>
          <FormAddPlayer
            player={selectedPlayer}
            lineUp={lineUp}
            onAddPlayer={addLineUpPlayer}
            onCancel={handleClosePopUp}
          />
        </PopUp>
      )}
      <Header>
        <Logo />
        <Title />
        <Stats stats={stats} />
      </Header>
      <Main>
        <LeftSide>
          <SearchForm fetchPlayers={(player) => fetchPlayers(player, lineUp)} />
          <ListPlayers>
            {!isLoading &&
              !error &&
              players.map((player) => {
                return (
                  <Player
                    key={player.id}
                    player={player}
                    onSelectPlayer={setSelectedPlayer}
                  />
                );
              })}
            {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
          </ListPlayers>
        </LeftSide>
        <RightSide>
          <LineUp>
            <LineUpPlayers
              lineUp={lineUp}
              onHoverPlayer={setHoverPlayer}
              onRemovePlayer={removeLineUpPlayer}
            />
            <LineUpPhoto>
              {lineUp.map((p, i) => {
                return (
                  <LineUpPlayer
                    pos={p.pos}
                    player={p.player}
                    key={i}
                    num={i + 1}
                    isHovered={hoverPlayer === i + 1}
                  />
                );
              })}
            </LineUpPhoto>
          </LineUp>
        </RightSide>
      </Main>
    </>
  );
}

export default FantasyTeam;
