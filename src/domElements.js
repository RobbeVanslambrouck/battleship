const DomElements = (() => {
  const createBoard = (board, showShips = true) => {
    const boardElement = document.createElement('div');
    boardElement.className = 'board';
    for (let i = 0; i < board.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'row';
      row.id = `row ${i}`;
      for (let j = 0; j < board[i].length; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `${j} ${i}`;
        switch (board[i][j]) {
          case 'm':
            cell.classList.add('pin');
            cell.classList.add('miss');
            break;
          case 'w':
            cell.classList.add('water');
            break;
          case 'h':
            cell.classList.add('pin');
            cell.classList.add('hit');
            break;
          default:
            if (showShips) {
              cell.classList.add('ship');
              break;
            }
            cell.classList.add('water');
            break;
        }
        row.append(cell);
      }
      boardElement.append(row);
    }
    return boardElement;
  };

  const renderPlayerBoard = (board) => {
    const playerBoard = document.querySelector('.playerBoard');
    playerBoard.append(createBoard(board));
  };
  const renderEnemyBoard = (board) => {
    const enemyBoard = document.querySelector('.enemyBoard');
    enemyBoard.append(createBoard(board, false));
  };
  return { renderPlayerBoard, renderEnemyBoard };
})();

export default DomElements;
