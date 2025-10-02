import React from 'react';

interface GameOverProps {
  gameWon: boolean;
  gameOver: boolean;
  score: number;
  onRestart: () => void;
  onContinue?: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  gameWon,
  gameOver,
  score,
  onRestart,
  onContinue,
}) => {
  if (!gameWon && !gameOver) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxWidth: '400px',
          animation: 'slideUp 0.4s ease-out',
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            margin: '0 0 20px 0',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {gameWon ? '🎉 You Won!' : '😢 Game Over'}
        </h2>
        <p
          style={{
            fontSize: '24px',
            margin: '0 0 30px 0',
            color: '#ffffff',
          }}
        >
          Score: {score}
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={onRestart}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
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
          {gameWon && onContinue && (
            <button
              onClick={onContinue}
              style={{
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
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
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
