import React from "react";
import footballStaduim from "../../assets/fantasyAssets/football-staduim.jpg"
export function LineUpPhoto({ children }) {
  return (
    <div className="lineup-photo">
      <img src={footballStaduim} alt="football staduim" />
      {children}
    </div>
  );
}
