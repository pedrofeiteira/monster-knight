import React, { Component } from 'react';

export default class Pawn extends Component {
    render() {
        return (
            <div style={{
              fontSize: 45,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              &#9823;
            </div>
          );
    }
}