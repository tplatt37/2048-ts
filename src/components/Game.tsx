import React from 'react';
import { useGame } from '../hooks/useGame';
import { Board } from './Board';
import { GameOver } from './GameOver';

export const Game: React.FC = () => {
  const { board, score, bestScore, gameWon, gameOver, resetGame, continueGame } = useGame();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            margin: '0 0 10px 0',
            color: '#ffffff',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          2048
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 20px 0',
          }}
        >
          Use arrow keys to play
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '15px 30px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '120px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '5px',
            }}
          >
            SCORE
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            {score}
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '15px 30px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '120px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '5px',
            }}
          >
            BEST
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            {bestScore}
          </div>
        </div>

        <button
          onClick={resetGame}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
        >
          New Game
        </button>
      </div>

      <Board board={board} />

      <GameOver
        gameWon={gameWon}
        gameOver={gameOver}
        score={score}
        onRestart={resetGame}
        onContinue={continueGame}
      />
    </div>
  );
};
