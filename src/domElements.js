const DomElements = (() => {
  const createBoard = (board) => {
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
          case -1:
            cell.classList.add('miss');
            break;
          case 0:
            cell.classList.add('water');
            break;
          default:
            cell.classList.add('ship');
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
    console.log(board, playerBoard);
  };
  const renderEnemyBoard = (board) => {
    const enemyBoard = document.querySelector('.enemyBoard');
    enemyBoard.append(createBoard(board));
    console.log(board);
  };
  return { renderPlayerBoard, renderEnemyBoard };
})();

export default DomElements;
