import React, { Component } from 'react';
import { startGame, restartGame, setDifficulty }  from './Game';

function handleStartGameClick(e) {
    e.preventDefault();
    startGame();
}

function handleRestartGameClick(e) {
    e.preventDefault();
    restartGame();
}

function handleDifficultyChange(e) {
    e.preventDefault();
    setDifficulty(e.target.value);
}

export default class GameControls extends Component {
    render() {
        return (
            <div style={{
                marginTop: '50px'
            }}>
              <button onClick={handleStartGameClick}>
                New puzzle
              </button>
              <button onClick={handleRestartGameClick}>
                Restart puzzle
              </button>
              <select  onChange={handleDifficultyChange}>
                <option value='easy'>Easy</option>
                <option value='normal'>Normal</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
          );
    }
}