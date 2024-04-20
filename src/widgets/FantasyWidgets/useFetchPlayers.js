import { useState } from "react";
import { fetchPlayers as fetchData } from "./fetchPlayers";

export function useFetchPlayers() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPlayers(player, lineUp) {
    try {
      setIsLoading(true);
      setError(null);
      if (!player) return setPlayers([]);
      if (player.length < 3) throw Error("Please enter at least 3 characters");
      const data = await fetchData(player);
      const playersData = [];
      const ids = [];
      data.data.forEach((player) => {
        if (!player.ability) {
          return;
        }
        if (!ids.includes(player.id)) {
          playersData.push(player);
          ids.push(player.id);
        }
      });
      const final = playersData.filter((player) => {
        return !lineUp.some((p) => p.player && p.player.id === player.id);
      });
      setPlayers(final);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    players,
    isLoading,
    error,
    fetchPlayers,
    setPlayers,
  };
}
