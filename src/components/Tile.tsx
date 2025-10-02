import React from 'react';
import { Tile as TileType } from '../utils/gameLogic';

interface TileProps {
  tile: TileType;
}

const getTileColor = (value: number): string => {
  const colors: { [key: number]: string } = {
    2: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    4: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    8: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    16: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    32: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    64: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    128: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    256: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    512: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    1024: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    2048: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  };
  return colors[value] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, position, isNew, mergedFrom } = tile;
  const { row, col } = position;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${row * 110 + 10}px`,
    left: `${col * 110 + 10}px`,
    width: '100px',
    height: '100px',
    background: getTileColor(value),
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: value >= 1000 ? '28px' : value >= 100 ? '36px' : '44px',
    fontWeight: 'bold',
    color: '#ffffff',
    boxShadow: isNew 
      ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)'
      : '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.15s ease-in-out',
    animation: isNew ? 'popAndPulse 0.6s ease-in-out' : mergedFrom ? 'merge 0.2s ease-in-out' : 'none',
    border: isNew ? '3px solid rgba(255, 255, 255, 0.9)' : 'none',
    zIndex: isNew ? 1000 : value,
  };

  return <div style={style}>{value}</div>;
};
