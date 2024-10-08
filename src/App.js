import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './style.css';

function App() {
  const [flips, setFlips] = useState(0);
  const [matches, setMatches] = useState(0);

  const handleReset = () => {
    setFlips(0);
    setMatches(0);
  };

  return (
    <div className="App">
      <header>
        <h1>Desert Adventure Match</h1>
      </header>
      <div id="ui-container">
        <h3>Flips: {flips}</h3>
        <h3>Matches: {matches}</h3>
      </div>
      <GameBoard flips={flips} setFlips={setFlips} matches={matches} setMatches={setMatches} />
      <div className="btn-container">
        <button className="reset-btn" onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}

export default App;