export async function fetchPlayers(player) {
    const res = await fetch(
      `https://sportscore1.p.rapidapi.com/players/search?sport_id=1&name=${player}`,
      {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": 'f72b06fffbmshdbb3c567af911fbp16ea8bjsna390cb0595bd',
          "X-RapidAPI-Host": 'sportscore1.p.rapidapi.com',
        },
      }
    );
    const data = await res.json();
    return data;
  }
  