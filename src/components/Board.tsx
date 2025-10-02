import React from 'react';
import { Board as BoardType } from '../utils/gameLogic';
import { Tile } from './Tile';

interface BoardProps {
  board: BoardType;
}

export const Board: React.FC<BoardProps> = ({ board }) => {
  const cells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      cells.push(
        <div
          key={`cell-${row}-${col}`}
          style={{
            position: 'absolute',
            top: `${row * 110 + 10}px`,
            left: `${col * 110 + 10}px`,
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
          }}
        />
      );
    }
  }

  const tiles = board.flat().filter((tile) => tile !== null);

  return (
    <div
      style={{
        position: 'relative',
        width: '450px',
        height: '450px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: '5px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {cells}
      {tiles.map((tile) => (
        <Tile key={tile!.id} tile={tile!} />
      ))}
    </div>
  );
};
