import DomElements from './domElements';
import Player from './player';
import Ship from './ship';

const Game = (() => {
  const players = [];
  players[0] = Player('p0');
  players[1] = Player('p1');

  const ship5 = Ship(5);
  players[0].getGameboard().placeShip(ship5, 0, 0, 'h');
  players[1].getGameboard().placeShip(ship5, 4, 6, 'h');

  const startGame = () => {
    const currPlayer = 0;
    const nextPlayer = (currPlayer + 1) % 2;
    players[currPlayer].turn(5, 5, players[nextPlayer]);
    DomElements.renderPlayerBoard(
      players[currPlayer].getGameboard().getBoard()
    );
    DomElements.renderEnemyBoard(players[nextPlayer].getGameboard().getBoard());
  };
  return { startGame };
})();

export default Game;
