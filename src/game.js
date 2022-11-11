/* eslint-disable no-await-in-loop */
import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  const gameModes = ['CPU_VS_PLAYER', 'CPU_VS_CPU', 'PLAYER_VS_PLAYER'];
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

  const gameOverModal = (winner) => {
    let tokenReplay = '';
    let tokenHome = '';
    const REPLAY_TOPIC = 'replay';
    const BACK_HOME_TOPIC = 'backHome';
    tokenReplay = PubSub.subscribe(REPLAY_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      Game.startGame();
    });
    tokenHome = PubSub.subscribe(BACK_HOME_TOPIC, () => {
      PubSub.unsubscribe(tokenReplay);
      PubSub.unsubscribe(tokenHome);
      DomElements.clearGame();
      showHomeScreen();
    });
    DomElements.showGameOverModal(REPLAY_TOPIC, BACK_HOME_TOPIC, winner);
  };

  const playerTurn = async (player, opponent, opponentBoardId, inputTopic) => {
    let res;
    const inputProm = (resolve) => {
      res = resolve;
    };
    const inputSub = (msg, data) => {
      PubSub.unsubscribe(inputTopic);
      const turnMsg = player.turn(data.x, data.y, opponent);
      if (turnMsg === 'already attacked') {
        PubSub.subscribe(inputTopic, inputSub);
        return;
      }
      res(data);
    };

    const input = new Promise(inputProm);
    PubSub.subscribe(inputTopic, inputSub);

    const data = await input;

    DomElements.updateBoard(
      opponentBoardId,
      opponent.getGameBoard().getBoard(),
      inputTopic
    );
    return data;
  };

  const placeShipsOnPlayersBoards = (players) => {
    players.forEach((player) => {
      const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
      for (let i = 0; i < ships.length; i += 1) {
        player.getGameBoard().placeShipRandomly(ships[i]);
      }
    });
  };

  const cpuVsCpu = async () => {
    let gameOver = false;
    let winner;
    const players = [];
    players[0] = Player('cpu 1');
    players[1] = Player('cpu 2');

    placeShipsOnPlayersBoards(players);

    DomElements.renderBoard(players[0].getGameBoard().getBoard(), 'player', 0);
    DomElements.renderBoard(players[1].getGameBoard().getBoard(), 'player', 1);
    while (!gameOver) {
      await players[0].AISmartTurn(players[1]);
      DomElements.updateBoard(1, players[1].getGameBoard().getBoard());
      gameOver = players[1].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[0].getName();
        break;
      }
      await players[1].AISmartTurn(players[0]);
      DomElements.updateBoard(0, players[0].getGameBoard().getBoard());
      gameOver = players[0].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[1].getName();
      }
    }

    gameOverModal(winner);
  };

  const cpuVsPlayer = async () => {
    const players = [];
    const INPUT_TOPIC = 'attack';
    let gameOver = false;
    let winner = '';
    players[0] = Player('player');
    players[1] = Player('cpu');

    placeShipsOnPlayersBoards(players);

    DomElements.renderBoard(
      players[1].getGameBoard().getBoard(),
      'enemy',
      1,
      INPUT_TOPIC
    );

    DomElements.renderBoard(players[0].getGameBoard().getBoard(), 'player', 0);

    while (!gameOver) {
      await playerTurn(players[0], players[1], 1, INPUT_TOPIC);
      gameOver = players[1].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[0].getName();
        break;
      }
      await players[1].AISmartTurn(players[0], 300);
      DomElements.updateBoard(0, players[0].getGameBoard().getBoard());
      gameOver = players[0].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[1].getName();
        break;
      }
    }
    gameOverModal(winner);
  };

  const PlayerVsPlayer = async () => {
    const players = [];
    let gameOver = false;
    let winner = '';
    const P1_INPUT_TOPIC = 'p1Input';
    const P2_INPUT_TOPIC = 'p2Input';

    players[0] = Player('player 1');
    players[1] = Player('player 2');

    placeShipsOnPlayersBoards(players);

    DomElements.renderBoard(
      players[0].getGameBoard().getBoard(),
      'enemy',
      0,
      P2_INPUT_TOPIC
    );

    DomElements.renderBoard(
      players[1].getGameBoard().getBoard(),
      'enemy',
      1,
      P1_INPUT_TOPIC
    );

    while (!gameOver) {
      await playerTurn(players[0], players[1], 1, P1_INPUT_TOPIC);
      gameOver = players[1].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[0].getName();
        break;
      }
      await playerTurn(players[1], players[0], 0, P2_INPUT_TOPIC);
      gameOver = players[0].getGameBoard().areAllShipsSunk();
      if (gameOver) {
        winner = players[1].getName();
        break;
      }
    }
    gameOverModal(winner);
  };

  const startGame = () => {
    if (gameMode === 'CPU_VS_CPU') {
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
