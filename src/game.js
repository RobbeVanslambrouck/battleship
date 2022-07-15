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
    console.log('game over');
  };

  const cpuVsPlayer = () => {
    const PLAYER = 0;
    const ENEMY = 1;
    const ATTACK_TOPIC = 'attack';
    const REPLAY_TOPIC = 'replay';
    const BACK_HOME_TOPIC = 'backHome';
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
      ATTACK_TOPIC
    );

    DomElements.renderBoard(
      players[PLAYER].getGameboard().getBoard(),
      'player',
      0
    );

    let tokenAttack = '';
    let tokenReplay = '';
    let tokenHome = '';
    const attackSub = async (msg, data) => {
      PubSub.unsubscribe(tokenAttack);
      const turnMsg = players[PLAYER].turn(data.x, data.y, players[ENEMY]);
      if (turnMsg === 'already attacked') {
        tokenAttack = PubSub.subscribe(ATTACK_TOPIC, attackSub);
        return;
      }
      DomElements.updateBoard(
        1,
        players[ENEMY].getGameboard().getBoard(),
        ATTACK_TOPIC
      );
      const playerWon = players[ENEMY].getGameboard().areAllShipsSunk();
      if (playerWon) {
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
        DomElements.showGameOverModal(
          REPLAY_TOPIC,
          BACK_HOME_TOPIC,
          players[PLAYER].getName()
        );
        return;
      }
      await players[ENEMY].AISmartTurn(players[PLAYER], 300);
      DomElements.updateBoard(0, players[PLAYER].getGameboard().getBoard());
      const EnemyWon = players[PLAYER].getGameboard().areAllShipsSunk();
      if (EnemyWon) {
        tokenReplay = PubSub.subscribe(REPLAY_TOPIC, () => {
          PubSub.unsubscribe(tokenReplay);
          PubSub.unsubscribe(tokenHome);
          DomElements.clearGame();
          cpuVsPlayer();
        });
        tokenHome = PubSub.subscribe(BACK_HOME_TOPIC, () => {
          PubSub.unsubscribe(tokenHome);
          PubSub.unsubscribe(tokenReplay);
          DomElements.clearGame();
          showHomeScreen();
        });
        DomElements.showGameOverModal(
          REPLAY_TOPIC,
          BACK_HOME_TOPIC,
          players[ENEMY].getName()
        );
        return;
      }
      tokenAttack = PubSub.subscribe(ATTACK_TOPIC, attackSub);
    };

    tokenAttack = PubSub.subscribe(ATTACK_TOPIC, attackSub);
  };

  const PlayerVsPlayer = () => {
    console.log('not yet implemented');
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
