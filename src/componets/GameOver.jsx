export default function GameOver({ restart, winner }) {
  return (
    <div id="game-over">
      <h2>game over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It' Draw</p>}
      <p>
        <button onClick={restart}>Rematch</button>
      </p>
    </div>
  );
}
