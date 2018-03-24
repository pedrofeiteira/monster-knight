import React        from 'react';
import ReactDOM     from 'react-dom';
import Board        from './Board';
import GameControls from './GameControls';
import { observe }  from './Game';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

observe(pieces => 
    ReactDOM.render(
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <Board knightPosition={pieces.knightPosition} pawnsPosition={pieces.pawnsPosition} />
            <GameControls />
        </div>,
        rootEl
)
);

registerServiceWorker();