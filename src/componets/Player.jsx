import { useState } from "react";
export default function Player({ initilaName, symbol, activePlayer }) {
  const [isEdditing, setIsEdditing] = useState(false);
  const [palyerName, setPalyerName] = useState(initilaName);
  function handleCLick() {
    setIsEdditing((eddited) => !eddited);
  }
  function handleChange(e) {
    setPalyerName(e.target.value);
  }

  let player = <span className="player-name">{palyerName}</span>;
  if (isEdditing)
    player = (
      <input type="text" onChange={handleChange} value={palyerName} required />
    );
  return (
    <li className={activePlayer ? "active" : undefined}>
      <span className="player">
        {player}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleCLick}>{!isEdditing ? "Edit" : "Save"}</button>
    </li>
  );
}
