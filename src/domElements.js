import PubSub from 'pubsub-js';

const DomElements = (() => {
  const createBoard = (board, showShips = true, subTopic = null) => {
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
        if (subTopic) {
          cell.onclick = () => {
            PubSub.publish(subTopic, { x: j, y: i });
          };
        }
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
    playerBoard.innerHTML = '';
    playerBoard.append(createBoard(board));
  };
  const renderEnemyBoard = (board, clickTopic) => {
    const enemyBoard = document.querySelector('.enemyBoard');
    enemyBoard.innerHTML = '';
    enemyBoard.classList.add('enemy');
    enemyBoard.append(createBoard(board, false, clickTopic));
  };
  return { renderPlayerBoard, renderEnemyBoard };
})();

export default DomElements;
