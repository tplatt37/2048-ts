import { useState, useEffect, useCallback } from 'react';
import {
  Board,
  Direction,
  initializeGame,
  move,
  addRandomTile,
  hasWon,
  canMove,
} from '../utils/gameLogic';

export const useGame = () => {
  const [board, setBoard] = useState<Board>(() => initializeGame());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score.toString());
    }
  }, [score, bestScore]);

  const handleMove = useCallback(
    (direction: Direction) => {
      if (gameOver || isAnimating) return;

      const { board: newBoard, score: moveScore, moved } = move(board, direction);

      if (!moved) return;

      setIsAnimating(true);
      setBoard(newBoard);
      setScore((prev: number) => prev + moveScore);

      setTimeout(() => {
        const boardWithNewTile = addRandomTile(newBoard);
        setBoard(boardWithNewTile);
        setIsAnimating(false);

        if (hasWon(boardWithNewTile) && !gameWon) {
          setGameWon(true);
        }

        if (!canMove(boardWithNewTile)) {
          setGameOver(true);
        }
      }, 200);
    },
    [board, gameOver, gameWon, isAnimating]
  );

  const resetGame = useCallback(() => {
    setBoard(initializeGame());
    setScore(0);
    setGameWon(false);
    setGameOver(false);
    setIsAnimating(false);
  }, []);

  const continueGame = useCallback(() => {
    setGameWon(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const directionMap: { [key: string]: Direction } = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right',
        };
        handleMove(directionMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return {
    board,
    score,
    bestScore,
    gameWon,
    gameOver,
    resetGame,
    continueGame,
    handleMove,
  };
};
