import { useState } from "react";
import Player from "./componets/Player";
import GameBoard from "./componets/GameBoard";
import Log from "./componets/Log";
import { WINNING_COMBINATIONS } from "./componets/winning_combinations";
import GameOver from "./componets/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const driveActivePlayer = function (gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";
  return currentPlayer;
};
function App() {
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = driveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    )
      winner = players[firstSymbol];
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectedButton(rowIndex, colIndex) {
    console.log(gameTurns);

    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(gameTurns);
      const updateGame = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateGame;
    });
  }
  function gameRestart() {
    setGameTurns([]);
  }
  function handleChangePlayerName({ symbol, newName }) {
    setPlayers((prevPlayer) => ({
      ...prevPlayer,
      [symbol]: newName,
    }));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initilaName="Player 1"
            symbol="X"
            activePlayer={activePlayer === "X"}
            onChangeName={handleChangePlayerName}
          />
          <Player
            initilaName="Player 2"
            symbol="O"
            activePlayer={activePlayer === "O"}
            onChangeName={handleChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver restart={gameRestart} winner={winner} />
        )}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectedButton} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
