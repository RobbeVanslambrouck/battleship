import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  const players = [];

  const init = () => {
    players[0] = Player('player');
    players[1] = Player('cpu');

    const p0Carrier = Ship(5);
    const p0Battleship = Ship(4);
    const p0Destroyer = Ship(3);
    const p0Submarine = Ship(3);
    const p0Patrol = Ship(2);

    players[0].getGameboard().placeShip(p0Carrier, 0, 0, 'h');
    players[0].getGameboard().placeShip(p0Battleship, 0, 2, 'h');
    players[0].getGameboard().placeShip(p0Destroyer, 0, 4, 'h');
    players[0].getGameboard().placeShip(p0Submarine, 0, 6, 'h');
    players[0].getGameboard().placeShip(p0Patrol, 0, 8, 'h');

    const p1Carrier = Ship(5);
    const p1Battleship = Ship(4);
    const p1Destroyer = Ship(3);
    const p1Submarine = Ship(3);
    const p1Patrol = Ship(2);

    players[1].getGameboard().placeShip(p1Carrier, 0, 0, 'h');
    players[1].getGameboard().placeShip(p1Battleship, 0, 2, 'h');
    players[1].getGameboard().placeShip(p1Destroyer, 0, 4, 'h');
    players[1].getGameboard().placeShip(p1Submarine, 0, 6, 'h');
    players[1].getGameboard().placeShip(p1Patrol, 0, 8, 'h');
  };

  const startGame = () => {
    init();
    const PLAYER = 0;
    const ENEMY = 1;
    const ATTACK_TOPIC = 'attack';
    const updateEnemyBoard = () => {
      DomElements.renderEnemyBoard(
        players[ENEMY].getGameboard().getBoard(),
        ATTACK_TOPIC
      );
    };
    const updatePlayerBoard = () => {
      DomElements.renderPlayerBoard(players[PLAYER].getGameboard().getBoard());
    };
    updateEnemyBoard();
    updatePlayerBoard();

    const enemyAttack = (aiLevel) => {
      if (aiLevel === "can't lose") {
        players[ENEMY].AIRandomTurn(players[PLAYER]);
      } else if (aiLevel === 'easy') {
        players[ENEMY].AISmartTurn(players[PLAYER]);
      } else if (aiLevel === 'impossible') {
        players[ENEMY].AIImpossibleTurn(players[PLAYER]);
      } else if (aiLevel === 'instaKill') {
        players[ENEMY].AIInstaKillTurn(players[PLAYER]);
      }
    };

    let token = '';
    const attackSub = (msg, data) => {
      PubSub.unsubscribe(token);
      const turnMsg = players[PLAYER].turn(data.x, data.y, players[ENEMY]);
      if (turnMsg === 'already attacked') {
        token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
        return;
      }
      updateEnemyBoard();
      const playerWon = players[ENEMY].getGameboard().areAllShipsSunk();
      if (playerWon) {
        console.log(`game over: ${players[PLAYER].getName()} won`);
        return;
      }
      enemyAttack('easy');
      updatePlayerBoard();
      const EnemyWon = players[PLAYER].getGameboard().areAllShipsSunk();
      if (EnemyWon) {
        console.log(`game over: ${players[ENEMY].getName()} won`);
        return;
      }
      token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
    };

    token = PubSub.subscribe(ATTACK_TOPIC, attackSub);
  };
  return { startGame };
})();

export default Game;
