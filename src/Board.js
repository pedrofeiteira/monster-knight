import React, { Component } from 'react';
import { DragDropContext }  from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import Knight from './Knight';
import Pawn from './Pawn';
import BoardSquare from './BoardSquare';
import { moveKnight, canMoveKnight } from './Game';

class Board extends Component {
    static propTypes = {
        knightPosition: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,

        pawnsPosition: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
    };

    handleSquareClick(toX, toY) {
        if(canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }

    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
          <div key={i}
               style={{ width: '12.5%', height: '12.5%' }}
               onClick={() => this.handleSquareClick(x, y)}>
            <BoardSquare x={x}
                         y={y}>
              {this.renderPiece(x, y)}
            </BoardSquare>
          </div>
        );
      }

      renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        //const [pawnX, pawnY] = this.props.pawnsPosition[0];
        const pawnsPosition = this.props.pawnsPosition;

        
        const hasPawn = pawnsPosition.find(function(pawn) {
            return x === pawn.x && y === pawn.y;
        });
        
        if (x === knightX && y === knightY) {
          return <Knight />;
        }
        else if (hasPawn) {
            return <Pawn />;
        }
      }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
                <p style={{align: 'right', color: 'green'}}>Monster Knight v0.1</p>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);