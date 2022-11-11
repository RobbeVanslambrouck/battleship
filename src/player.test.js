import Player from './player';
import GameBoard from './gameBoard';
import Ship from './ship';

test('get/set name', () => {
  const player = Player('name');
  expect(player.getName()).toBe('name');
  player.SetName('newName');
  expect(player.getName()).toBe('newName');
});

test('get/set game board', () => {
  const player = Player('p1');
  const pb = GameBoard(2);
  player.setGameBoard(pb);
  expect(player.getGameBoard()).toStrictEqual(pb);
});

test('turn', () => {
  const player = Player('p1');
  const ship = Ship(2);
  const enemy = Player('p2');
  enemy.getGameBoard().placeShip(ship, 0, 1, 'h');
  const board = GameBoard(10);
  board.placeShip(ship, 0, 1, 'h');
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  expect(player.turn(0, 0, enemy)).toBe('miss');
  expect(player.turn(0, 0, enemy)).toBe('already attacked');
  expect(player.turn(0, 1, enemy)).toBe('hit');
  expect(player.turn(0, 1, enemy)).toBe('already attacked');
  expect(enemy.getGameBoard().getBoard()).toStrictEqual(board.getBoard());
});

test('AIRandomTurn', () => {
  const player = Player('p1');
  const enemy = Player('p2');
  enemy.setGameBoard(GameBoard(2));
  const board = GameBoard(2);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(1, 0);
  board.receiveAttack(1, 1);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  player.AIRandomTurn(enemy);
  expect(enemy.getGameBoard().getBoard()).toStrictEqual(board.getBoard());
});

test('AISmartTurn', async () => {
  const player = Player('p1');
  const enemy = Player('p2');
  enemy.setGameBoard(GameBoard(2));
  const board = GameBoard(2);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(1, 0);
  board.receiveAttack(1, 1);
  await player.AISmartTurn(enemy);
  await player.AISmartTurn(enemy);
  await player.AISmartTurn(enemy);
  await player.AISmartTurn(enemy);
  expect(enemy.getGameBoard().getBoard()).toStrictEqual(board.getBoard());
});
