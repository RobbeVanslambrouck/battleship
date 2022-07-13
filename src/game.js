import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  const players = [];

  const init = () => {
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
