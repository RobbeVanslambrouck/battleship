import PubSub from 'pubsub-js';

const DomElements = (() => {
  const game = document.querySelector('.game');
  const createBoard = (board, showShips = true, subTopic = null) => {
    const boardElement = document.createElement('div');
    boardElement.className = 'board';
    for (let i = 0; i < board.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'row';
      row.id = `row ${i}`;
      for (let j = 0; j < board[i].length; j += 1) {
        const Tile = document.createElement('div');
        Tile.classList.add('tile');
        Tile.id = `${j} ${i}`;
        if (subTopic) {
          Tile.onclick = () => {
            PubSub.publish(subTopic, { x: j, y: i });
          };
        }
        switch (board[i][j]) {
          case 'w':
            Tile.classList.add('water');
            break;
          case 'm':
            Tile.classList.add('pin');
            Tile.classList.add('miss');
            break;
          case 'h':
            Tile.classList.add('pin');
            Tile.classList.add('hit');
            break;
          case 's':
            Tile.classList.add('pin');
            Tile.classList.add('hit');
            Tile.classList.add('sunk');
            break;
          default:
            if (showShips) {
              Tile.classList.add('ship');
              break;
            }
            Tile.classList.add('water');
            break;
        }
        row.append(Tile);
      }
      boardElement.append(row);
    }
    return boardElement;
  };

  const renderBoard = (board, playerType, id, clickPub = null) => {
    game.querySelector('.game');
    const divBoard = document.createElement('div');
    divBoard.id = `board-${id}`;
    divBoard.classList.add(playerType);
    const showShips = playerType === 'player';
    divBoard.append(createBoard(board, showShips, clickPub));
    game.append(divBoard);
  };

  const updateBoard = (id, board, clickPub = null) => {
    game.querySelector('.game');
    const divBoard = game.querySelector(`#board-${id}`);
    const showShips = divBoard.classList.contains('player');
    divBoard.innerHTML = '';
    divBoard.append(createBoard(board, showShips, clickPub));
  };

  const clearGame = () => {
    game.querySelector('.game');
    game.innerHTML = '';
  };

  return { renderBoard, updateBoard, clearGame };
})();

export default DomElements;
