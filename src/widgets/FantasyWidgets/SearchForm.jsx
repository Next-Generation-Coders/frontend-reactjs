import React, { useEffect, useRef, useState } from "react";

export function SearchForm({ fetchPlayers }) {
  const [input, setInput] = useState("");
  const searchElt = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    fetchPlayers(input);
  }

  useEffect(() => {
    searchElt.current.focus();
  }, []);
  return (
    <form className="search-from" role="search" onSubmit={handleSubmit}>
      <input
        id="search"
        type="search"
        placeholder="Search for a player"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={searchElt}
      />
      <button type="submit">Go</button>
    </form>
  );
}
