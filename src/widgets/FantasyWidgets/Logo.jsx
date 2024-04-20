import React from "react";
import footballlogo from "../../assets/fantasyAssets/football-logo.png"
export function Logo() {
  return (
    <div className="logo">
      <img
        src={footballlogo}
        alt="football logo"
        className="logo-image"
      />
      <h1 className="logo-title">Dream Squad</h1>
    </div>
  );
}
