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
    game.innerHTML = '';
  };

  const renderHomePage = (playSubTopic, gameModes = []) => {
    const main = document.querySelector('main');
    const divHome = document.createElement('div');
    divHome.classList.add('home');

    const selectGameMode = document.createElement('select');
    selectGameMode.name = 'gameMode';
    selectGameMode.id = 'gameMode';
    gameModes.forEach((mode) => {
      const gameMode = document.createElement('option');
      gameMode.value = mode;
      gameMode.textContent = mode;
      selectGameMode.append(gameMode);
    });
    divHome.append(selectGameMode);

    const btnPlay = document.createElement('button');
    btnPlay.type = 'button';
    btnPlay.textContent = 'play game';
    btnPlay.onclick = (e) => {
      e.stopPropagation();
      const gameMode = selectGameMode.value;
      PubSub.publish(playSubTopic, { gameMode });
      divHome.remove();
    };
    divHome.prepend(btnPlay);

    main.append(divHome);
  };

  const showGameOverModal = (replaySubTopic, HomeSubTopic, winner) => {
    const divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.id = 'gameOverModal';

    const divGameOverModal = document.createElement('div');
    divGameOverModal.classList.add('modal-content');
    divModal.append(divGameOverModal);

    const pGameOver = document.createElement('p');
    pGameOver.classList.add('modal-title');
    pGameOver.textContent = 'game over';
    divGameOverModal.append(pGameOver);

    const pWinner = document.createElement('p');
    pWinner.classList.add('modal-msg');
    pWinner.textContent = `${winner} won`;
    divGameOverModal.append(pWinner);

    const btnPlayAgain = document.createElement('button');
    btnPlayAgain.classList.add('modal-action');
    btnPlayAgain.textContent = 'play again';
    btnPlayAgain.type = 'button';
    btnPlayAgain.onclick = (e) => {
      e.stopPropagation();
      divModal.remove();
      PubSub.publish(replaySubTopic, {});
    };
    divGameOverModal.append(btnPlayAgain);

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('modal-cancel');
    btnCancel.textContent = 'back to menu';
    btnCancel.type = 'button';
    btnCancel.onclick = (e) => {
      e.stopPropagation();
      divModal.remove();
      PubSub.publish(HomeSubTopic, {});
    };
    divGameOverModal.append(btnCancel);

    document.querySelector('main').append(divModal);
  };

  return {
    renderBoard,
    updateBoard,
    clearGame,
    renderHomePage,
    showGameOverModal,
  };
})();

export default DomElements;
