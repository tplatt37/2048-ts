export type Tile = {
  id: string;
  value: number;
  position: { row: number; col: number };
  mergedFrom?: Tile[];
  isNew?: boolean;
};

export type Board = (Tile | null)[][];

export type Direction = 'up' | 'down' | 'left' | 'right';

export const createEmptyBoard = (): Board => {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(null));
};

export const addRandomTile = (board: Board): Board => {
  const emptyCells: { row: number; col: number }[] = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return board;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((row) => [...row]);
  newBoard[randomCell.row][randomCell.col] = {
    id: `${Date.now()}-${Math.random()}`,
    value,
    position: randomCell,
    isNew: true,
  };

  return newBoard;
};

export const initializeGame = (): Board => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const slideLine = (line: (Tile | null)[]): { line: (Tile | null)[]; score: number } => {
  // Filter out nulls
  let tiles = line.filter((tile) => tile !== null) as Tile[];
  let score = 0;

  // Merge tiles
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i].value === tiles[i + 1].value) {
      tiles[i] = {
        id: `merged-${Date.now()}-${Math.random()}`,
        value: tiles[i].value * 2,
        position: tiles[i].position,
        mergedFrom: [tiles[i], tiles[i + 1]],
      };
      score += tiles[i].value;
      tiles.splice(i + 1, 1);
    }
  }

  // Pad with nulls
  const result: (Tile | null)[] = [...tiles];
  while (result.length < 4) {
    result.push(null);
  }

  return { line: result, score };
};

export const move = (board: Board, direction: Direction): { board: Board; score: number; moved: boolean } => {
  let newBoard = createEmptyBoard();
  let totalScore = 0;
  let moved = false;

  if (direction === 'left') {
    for (let row = 0; row < 4; row++) {
      const { line, score } = slideLine(board[row]);
      newBoard[row] = line.map((tile, col) =>
        tile ? { ...tile, position: { row, col } } : null
      );
      totalScore += score;
      if (!arraysEqual(board[row], newBoard[row])) moved = true;
    }
  } else if (direction === 'right') {
    for (let row = 0; row < 4; row++) {
      const reversed = [...board[row]].reverse();
      const { line, score } = slideLine(reversed);
      newBoard[row] = line
        .reverse()
        .map((tile, col) => (tile ? { ...tile, position: { row, col } } : null));
      totalScore += score;
      if (!arraysEqual(board[row], newBoard[row])) moved = true;
    }
  } else if (direction === 'up') {
    for (let col = 0; col < 4; col++) {
      const column = [board[0][col], board[1][col], board[2][col], board[3][col]];
      const { line, score } = slideLine(column);
      for (let row = 0; row < 4; row++) {
        newBoard[row][col] = line[row] ? { ...line[row]!, position: { row, col } } : null;
      }
      totalScore += score;
      if (!arraysEqual(column, line)) moved = true;
    }
  } else if (direction === 'down') {
    for (let col = 0; col < 4; col++) {
      const column = [board[3][col], board[2][col], board[1][col], board[0][col]];
      const { line, score } = slideLine(column);
      for (let row = 0; row < 4; row++) {
        newBoard[3 - row][col] = line[row] ? { ...line[row]!, position: { row: 3 - row, col } } : null;
      }
      totalScore += score;
      if (!arraysEqual(column, line)) moved = true;
    }
  }

  return { board: newBoard, score: totalScore, moved };
};

const arraysEqual = (a: (Tile | null)[], b: (Tile | null)[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if ((a[i] === null) !== (b[i] === null)) return false;
    if (a[i] !== null && b[i] !== null && a[i]!.value !== b[i]!.value) return false;
  }
  return true;
};

export const hasWon = (board: Board): boolean => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col]?.value === 2048) return true;
    }
  }
  return false;
};

export const canMove = (board: Board): boolean => {
  // Check for empty cells
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === null) return true;
    }
  }

  // Check for possible merges
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const current = board[row][col];
      if (!current) continue;

      // Check right
      if (col < 3 && board[row][col + 1]?.value === current.value) return true;
      // Check down
      if (row < 3 && board[row + 1][col]?.value === current.value) return true;
    }
  }

  return false;
};
