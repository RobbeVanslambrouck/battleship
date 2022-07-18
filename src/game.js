/* eslint-disable no-await-in-loop */
import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  let players = [];
  const gameModes = ['CPU_VS_PLAYER', 'CPU_FIGHT', 'PLAYER_VS_PLAYER'];
  let gameMode = gameModes[1];
  const getGameModes = () => gameModes;
  const setGameMode = (mode) => {
    gameMode = mode;
  };

  const showHomeScreen = () => {
    const PLAY_GAME_TOPIC = 'btnPlayGame';
    const modes = getGameModes().map((mode) =>
      mode.toLocaleLowerCase().replaceAll('_', ' ')
    );
    DomElements.renderHomePage(PLAY_GAME_TOPIC, modes);

    let playGameToken = '';
    playGameToken = PubSub.subscribe(PLAY_GAME_TOPIC, (msg, data) => {
      const mode = data.gameMode.replaceAll(' ', '_').toUpperCase();
      PubSub.unsubscribe(playGameToken);
      Game.setGameMode(mode);
      Game.startGame();
    });
  };

  const cpuVsCpu = async () => {
    let gameOver = false;
    players = [];
    players[0] = Player('cpu 1');
    players[1] = Player('cpu 2');

    const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    for (let i = 0; i < playerShips.length; i += 1) {
      players[0].getGameboard().placeShipRandomly(playerShips[i]);
    }

    const enemyShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    for (let i = 0; i < enemyShips.length; i += 1) {
      players[1].getGameboard().placeShipRandomly(enemyShips[i]);
    }
    DomElements.renderBoard(players[0].getGameboard().getBoard(), 'player', 0);
    DomElements.renderBoard(players[1].getGameboard().getBoard(), 'player', 1);
    while (!gameOver) {
      await players[0].AISmartTurn(players[1]);
      DomElements.updateBoard(0, players[0].getGameboard().getBoard());
      gameOver = players[0].getGameboard().areAllShipsSunk();
      if (gameOver) break;
      await players[1].AISmartTurn(players[0]);
      DomElements.updateBoard(1, players[1].getGameboard().getBoard());
      gameOver = players[1].getGameboard().areAllShipsSunk();
    }
    const winner = players[0].getGameboard().areAllShipsSunk()
      ? players[0].getName()
      : players[1].getName();
    let tokenReplay = '';
    let tokenHome = '';
    const REPLAY_TOPIC = 'replay';
    const BACK_HOME_TOPIC = 'backHome';
    tokenReplay = PubSub.subscribe(REPLAY_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      cpuVsCpu();
    });
    tokenHome = PubSub.subscribe(BACK_HOME_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      showHomeScreen();
    });
    DomElements.showGameOverModal(REPLAY_TOPIC, BACK_HOME_TOPIC, winner);
  };

  const cpuVsPlayer = async () => {
    const PLAYER = 0;
    const ENEMY = 1;
    const INPUT_TOPIC = 'attack';
    let gameOver = false;
    let winner = '';
    players[0] = Player('player');
    players[1] = Player('cpu');

    const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    for (let i = 0; i < playerShips.length; i += 1) {
      players[0].getGameboard().placeShipRandomly(playerShips[i]);
    }

    const enemyShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    for (let i = 0; i < enemyShips.length; i += 1) {
      players[1].getGameboard().placeShipRandomly(enemyShips[i]);
    }

    DomElements.renderBoard(
      players[ENEMY].getGameboard().getBoard(),
      'enemy',
      1,
      INPUT_TOPIC
    );

    DomElements.renderBoard(
      players[PLAYER].getGameboard().getBoard(),
      'player',
      0
    );

    let res;
    const playerInputProm = (resolve) => {
      res = resolve;
    };
    const playerInputSub = (msg, data) => {
      PubSub.unsubscribe(INPUT_TOPIC);
      const turnMsg = players[0].turn(data.x, data.y, players[1]);
      if (turnMsg === 'already attacked') {
        PubSub.subscribe(INPUT_TOPIC, playerInputSub);
        return;
      }
      res(data);
    };

    while (!gameOver) {
      // player turn
      const playerInput = new Promise(playerInputProm);
      PubSub.subscribe(INPUT_TOPIC, playerInputSub);
      // wait for player input
      await playerInput;
      // update cpu board
      DomElements.updateBoard(
        1,
        players[ENEMY].getGameboard().getBoard(),
        INPUT_TOPIC
      );
      // check if gameover
      gameOver = players[ENEMY].getGameboard().areAllShipsSunk();
      if (gameOver) {
        winner = players[PLAYER].getName();
        break;
      }
      // cpu turn
      await players[ENEMY].AISmartTurn(players[PLAYER], 300);
      // update player board
      DomElements.updateBoard(0, players[PLAYER].getGameboard().getBoard());
      // check if game over
      gameOver = players[PLAYER].getGameboard().areAllShipsSunk();
      if (gameOver) {
        winner = players[ENEMY].getName();
        break;
      }
    }
    // show game over modal
    let tokenReplay = '';
    let tokenHome = '';
    const REPLAY_TOPIC = 'replay';
    const BACK_HOME_TOPIC = 'backHome';
    tokenReplay = PubSub.subscribe(REPLAY_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      cpuVsPlayer();
    });
    tokenHome = PubSub.subscribe(BACK_HOME_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      showHomeScreen();
    });
    DomElements.showGameOverModal(REPLAY_TOPIC, BACK_HOME_TOPIC, winner);
  };

  const PlayerVsPlayer = async () => {
    console.log('not yet implemented');
    let gameOver = false;
    let winner = '';
    const P1_INPUT_TOPIC = 'p1Input';
    const P2_INPUT_TOPIC = 'p2Input';

    players = [];
    players[0] = Player('player 1');
    players[1] = Player('player 2');

    const player1Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
    const player2Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    for (let i = 0; i < player1Ships.length; i += 1) {
      players[0].getGameboard().placeShipRandomly(player1Ships[i]);
    }
    for (let i = 0; i < player2Ships.length; i += 1) {
      players[1].getGameboard().placeShipRandomly(player2Ships[i]);
    }

    DomElements.renderBoard(
      players[0].getGameboard().getBoard(),
      'enemy',
      0,
      P2_INPUT_TOPIC
    );

    DomElements.renderBoard(
      players[1].getGameboard().getBoard(),
      'enemy',
      1,
      P1_INPUT_TOPIC
    );

    let res1;
    const p1InputProm = (resolve) => {
      res1 = resolve;
    };
    const p1InputSub = (msg, data) => {
      PubSub.unsubscribe(P1_INPUT_TOPIC);
      const turnMsg = players[0].turn(data.x, data.y, players[1]);
      if (turnMsg === 'already attacked') {
        PubSub.subscribe(P1_INPUT_TOPIC, p1InputSub);
        return;
      }
      res1(data);
    };

    let res2;
    const p2InputProm = (resolve) => {
      res2 = resolve;
    };
    const p2InputSub = (msg, data) => {
      PubSub.unsubscribe(P2_INPUT_TOPIC);
      const turnMsg = players[1].turn(data.x, data.y, players[0]);
      if (turnMsg === 'already attacked') {
        PubSub.subscribe(P2_INPUT_TOPIC, p2InputSub);
        return;
      }
      res2(data);
    };

    while (!gameOver) {
      // turn player 1
      // player 1 input
      const p1Input = new Promise(p1InputProm);
      PubSub.subscribe(P1_INPUT_TOPIC, p1InputSub);
      await p1Input;
      // update player 2 board
      DomElements.updateBoard(
        1,
        players[1].getGameboard().getBoard(),
        P1_INPUT_TOPIC
      );
      // check if game over
      gameOver = players[1].getGameboard().areAllShipsSunk();
      if (gameOver) {
        winner = players[0].getName();
        break;
      }
      // turn player 2
      // player 2 input
      const p2Input = new Promise(p2InputProm);
      PubSub.subscribe(P2_INPUT_TOPIC, p2InputSub);
      await p2Input;
      // update player 1 board
      DomElements.updateBoard(
        0,
        players[0].getGameboard().getBoard(),
        P2_INPUT_TOPIC
      );
      // check if game over
      gameOver = players[0].getGameboard().areAllShipsSunk();
      if (gameOver) {
        winner = players[1].getName();
        break;
      }
    }

    // show game over modal
    let tokenReplay = '';
    let tokenHome = '';
    const REPLAY_TOPIC = 'replay';
    const BACK_HOME_TOPIC = 'backHome';
    tokenReplay = PubSub.subscribe(REPLAY_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      PlayerVsPlayer();
    });
    tokenHome = PubSub.subscribe(BACK_HOME_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      showHomeScreen();
    });
    DomElements.showGameOverModal(REPLAY_TOPIC, BACK_HOME_TOPIC, winner);
  };

  const startGame = () => {
    if (gameMode === 'CPU_FIGHT') {
      cpuVsCpu();
      return;
    }

    if (gameMode === 'CPU_VS_PLAYER') {
      cpuVsPlayer();
      return;
    }

    if (gameMode === 'PLAYER_VS_PLAYER') {
      PlayerVsPlayer();
    }
  };
  return { startGame, getGameModes, setGameMode };
})();

export default Game;
