import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

test('get/set name', () => {
  const player = Player('name');
  expect(player.getName()).toBe('name');
  player.SetName('newName');
  expect(player.getName()).toBe('newName');
});

test('get/set gameboard', () => {
  const player = Player('p1');
  const pb = Gameboard(2);
  player.setGameboard(pb);
  expect(player.getGameboard()).toStrictEqual(pb);
});

test('turn', () => {
  const player = Player('p1');
  const ship = Ship(2);
  const enemy = Player('p2');
  enemy.getGameboard().placeShip(ship, 0, 1, 'h');
  const board = Gameboard(10);
  board.placeShip(ship, 0, 1, 'h');
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(player.turn(0, 0, enemy)).toBe('miss');
  expect(player.turn(0, 0, enemy)).toBe('already attacked');
  expect(player.turn(0, 1, enemy)).toBe('hit');
  expect(player.turn(0, 1, enemy)).toBe('already attacked');
  expect(enemy.getGameboard().getBoard()).toStrictEqual(board.getBoard());
});

test('AIRandomTurn', () => {
  const player = Player('p1');
  const enemy = Player('p2');
  enemy.setGameboard(Gameboard(2));
  const board = Gameboard(2);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(1, 0);
  board.receiveAttack(1, 1);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  expect(enemy.getGameboard().getBoard()).toStrictEqual(board.getBoard());
});

test('AISmartTurn', async () => {
  const player = Player('p1');
  const enemy = Player('p2');
  enemy.setGameboard(Gameboard(2));
  const board = Gameboard(2);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(1, 0);
  board.receiveAttack(1, 1);
  player.AISmartTurn(enemy);
  player.AISmartTurn(enemy);
  player.AISmartTurn(enemy);
  player.AISmartTurn(enemy);
  expect(enemy.getGameboard().getBoard()).toStrictEqual(board.getBoard());
});
