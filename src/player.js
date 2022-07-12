import Gameboard from './gameboard';

const Player = (name) => {
  let thisName = name;
  let gameboard = Gameboard(10);
  const getName = () => thisName;
  const SetName = (newName) => {
    thisName = newName;
  };
  const getGameboard = () => gameboard;
  const setGameboard = (NewBoard) => {
    gameboard = NewBoard;
  };

  const turn = (x, y, enemy) => enemy.getGameboard().receiveAttack(x, y);

  const AIRandomTurn = (enemy) => {
    const attackable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (enemyBoard[i][j] !== 'h' && enemyBoard[i][j] !== 'm') {
          attackable.push({ x: j, y: i });
        }
      }
    }
    const i = Math.round(Math.random() * (attackable.length - 1));
    enemy.getGameboard().receiveAttack(attackable[i].x, attackable[i].y);
  };

  const getCellvalue = (x, y, board) => {
    let cellValue = 0;
    if (y < board.length - 1) {
      if (board[y + 1][x] === 'h') cellValue += 4;
      if (board[y + 1][x] === 'm') cellValue -= 1;
    }
    if (y > 0) {
      if (board[y - 1][x] === 'h') cellValue += 4;
      if (board[y - 1][x] === 'm') cellValue -= 1;
    }
    if (x < board.length - 1) {
      if (board[y][x + 1] === 'h') cellValue += 4;
      if (board[y][x + 1] === 'm') cellValue -= 1;
    }
    if (x > 0) {
      if (board[y][x - 1] === 'h') cellValue += 4;
      if (board[y][x - 1] === 'm') cellValue -= 1;
    }
    return cellValue;
  };

  const AISmartTurn = (enemy) => {
    let attackTable = [];
    let maxCellValue = -Infinity;
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (enemyBoard[i][j] !== 'h' && enemyBoard[i][j] !== 'm') {
          const cellValue = getCellvalue(j, i, enemyBoard);
          if (cellValue === maxCellValue) {
            attackTable.push({ x: j, y: i, cellValue });
          }

          if (cellValue > maxCellValue) {
            maxCellValue = cellValue;
            attackTable = [];
            attackTable.push({ x: j, y: i, cellValue });
          }
        }
      }
    }
    console.log(attackTable.length);
    const i = Math.round(Math.random() * (attackTable.length - 1));
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  const AIImpossibleTurn = (enemy) => {
    const attackTable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (
          enemyBoard[i][j] !== 'h' &&
          enemyBoard[i][j] !== 'm' &&
          enemyBoard[i][j] !== 'w'
        ) {
          attackTable.push({ x: j, y: i });
        }
      }
    }
    if (attackTable.length === 0) {
      AIRandomTurn(enemy);
      return;
    }
    console.log(attackTable.length);
    const i = Math.round(Math.random() * (attackTable.length - 1));
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  const AIInstaKillTurn = (enemy) => {
    const attackTable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (
          enemyBoard[i][j] !== 'h' &&
          enemyBoard[i][j] !== 'm' &&
          enemyBoard[i][j] !== 'w'
        ) {
          attackTable.push({ x: j, y: i });
        }
      }
    }
    if (attackTable.length === 0) {
      AIRandomTurn(enemy);
      return;
    }
    attackTable.forEach((attack) => {
      enemy.getGameboard().receiveAttack(attack.x, attack.y);
    });
  };

  return {
    getName,
    SetName,
    getGameboard,
    setGameboard,
    turn,
    AIRandomTurn,
    AISmartTurn,
    AIImpossibleTurn,
    AIInstaKillTurn,
  };
};

export default Player;
