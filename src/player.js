import Gameboard from './gameboard';
import { randInt } from './helper';

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
    const attackTable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (enemyBoard[i][j] !== 'h' && enemyBoard[i][j] !== 'm') {
          attackTable.push({ x: j, y: i });
        }
      }
    }
    const i = randInt(0, attackTable.length - 1);
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  const getTileValue = (x, y, board) => {
    const HIT = 4;
    let value = 0;
    const extBrd = [];
    extBrd.push(new Array(board.length + 2).fill('w'));
    board.forEach((row) => {
      const extRow = ['w', ...row, 'w'];
      extBrd.push(extRow);
    });
    extBrd.push(new Array(board.length + 2).fill('w'));
    const extX = x + 1;
    const extY = y + 1;

    if (extBrd[extY + 1][extX] === 'h' && extBrd[extY - 1][extX] === 'h')
      value += 4;
    if (extBrd[extY][extX + 1] === 'h' && extBrd[extY][extX - 1] === 'h')
      value += 4;

    if (
      extBrd[extY + 1][extX] === 'h' &&
      (extBrd[extY + 1][extX - 1] === 'h' || extBrd[extY + 1][extX + 1] === 'h')
    )
      value -= HIT;
    if (
      extBrd[extY - 1][extX] === 'h' &&
      (extBrd[extY - 1][extX - 1] === 'h' || extBrd[extY - 1][extX + 1] === 'h')
    )
      value -= HIT;
    if (
      extBrd[extY][extX + 1] === 'h' &&
      (extBrd[extY - 1][extX + 1] === 'h' || extBrd[extY + 1][extX + 1] === 'h')
    )
      value -= HIT;
    if (
      extBrd[extY][extX - 1] === 'h' &&
      (extBrd[extY - 1][extX - 1] === 'h' || extBrd[extY + 1][extX - 1] === 'h')
    )
      value -= HIT;
    if (extBrd[extY + 1][extX] === 'h') value += HIT;
    if (extBrd[extY - 1][extX] === 'h') value += HIT;
    if (extBrd[extY][extX + 1] === 'h') value += HIT;
    if (extBrd[extY][extX - 1] === 'h') value += HIT;
    if (extBrd[extY + 1][extX] === 'm') value -= 1;
    if (extBrd[extY + 1][extX] === 's') value -= 1;
    if (extBrd[extY - 1][extX] === 'm') value -= 1;
    if (extBrd[extY - 1][extX] === 's') value -= 1;
    if (extBrd[extY][extX + 1] === 'm') value -= 1;
    if (extBrd[extY][extX + 1] === 's') value -= 1;
    if (extBrd[extY][extX - 1] === 'm') value -= 1;
    if (extBrd[extY][extX - 1] === 's') value -= 1;
    return value;
  };

  const AISmartTurn = (enemy) => {
    let attackTable = [];
    let maxTileValue = -Infinity;
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (enemyBoard[i][j] === 'w' || typeof enemyBoard[i][j] === 'object') {
          const tileValue = getTileValue(j, i, enemyBoard);
          if (tileValue === maxTileValue) {
            attackTable.push({ x: j, y: i, tileValue });
          }

          if (tileValue > maxTileValue) {
            maxTileValue = tileValue;
            attackTable = [];
            attackTable.push({ x: j, y: i, tileValue });
          }
        }
      }
    }
    const i = randInt(0, attackTable.length - 1);
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  const AIImpossibleTurn = (enemy) => {
    const attackTable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (typeof enemyBoard[i][j] === 'object') {
          attackTable.push({ x: j, y: i });
        }
      }
    }
    if (attackTable.length === 0) {
      AIRandomTurn(enemy);
      return;
    }
    const i = randInt(0, attackTable.length - 1);
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  const AIInstaKillTurn = (enemy) => {
    const attackTable = [];
    const enemyBoard = enemy.getGameboard().getBoard();
    for (let i = 0; i < enemyBoard.length; i += 1) {
      for (let j = 0; j < enemyBoard[i].length; j += 1) {
        if (typeof enemyBoard[i][j] === 'object') {
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
