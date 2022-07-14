import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  let players = [];
  const gameModes = ['CPU_FIGHT', 'CPU_VS_PLAYER', 'PLAYER_VS_PLAYER'];
  const gameMode = gameModes[1];

  const cpuVsCpu = () => {
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
      players[0].AISmartTurn(players[1]);
      DomElements.updateBoard(0, players[0].getGameboard().getBoard());
      gameOver = players[0].getGameboard().areAllShipsSunk();
      if (gameOver) break;
      players[1].AISmartTurn(players[0]);
      DomElements.updateBoard(1, players[1].getGameboard().getBoard());
      gameOver = players[1].getGameboard().areAllShipsSunk();
    }
    console.log('game over');
  };

  const cpuVsPlayer = () => {
    const PLAYER = 0;
    const ENEMY = 1;
    const ATTACK_TOPIC = 'attack';
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
      players[PLAYER].getGameboard().getBoard(),
      'player',
      0
    );
    DomElements.renderBoard(
      players[ENEMY].getGameboard().getBoard(),
      'enemy',
      1,
      ATTACK_TOPIC
    );

    let token = '';
    const attackSub = (msg, data) => {
      PubSub.unsubscribe(token);
      const turnMsg = players[PLAYER].turn(data.x, data.y, players[ENEMY]);
      if (turnMsg === 'already attacked') {
        token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
        return;
      }
      DomElements.updateBoard(
        1,
        players[ENEMY].getGameboard().getBoard(),
        ATTACK_TOPIC
      );
      const playerWon = players[ENEMY].getGameboard().areAllShipsSunk();
      if (playerWon) {
        console.log(`game over: ${players[PLAYER].getName()} won`);
        return;
      }
      players[ENEMY].AISmartTurn(players[PLAYER]);
      DomElements.updateBoard(0, players[PLAYER].getGameboard().getBoard());
      const EnemyWon = players[PLAYER].getGameboard().areAllShipsSunk();
      if (EnemyWon) {
        console.log(`game over: ${players[ENEMY].getName()} won`);
        return;
      }
      token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
    };

    token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
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
  return { startGame };
})();

export default Game;
