import { useState } from "react";
export default function Player({
  initilaName,
  symbol,
  activePlayer,
  onChangeName,
}) {
  const [isEdditing, setIsEdditing] = useState(false);
  const [playerName, setPlayerName] = useState(initilaName);
  function handleEditCLick() {
    setIsEdditing((eddited) => !eddited);
    if (isEdditing) {
      console.log("inside of player component");
      console.log(symbol, playerName);
      if (playerName && symbol) onChangeName(symbol, playerName);
    }
  }
  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let player = <span className="player-name">{playerName}</span>;
  if (isEdditing)
    player = (
      <input type="text" onChange={handleChange} value={playerName} required />
    );
  return (
    <li className={activePlayer ? "active" : undefined}>
      <span className="player">
        {player}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditCLick}>{!isEdditing ? "Edit" : "Save"}</button>
    </li>
  );
}
