import Player from './player';
import Gameboard from './gameboard';

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
  const enemy = Player('p2');
  const board = Gameboard(10);
  board.receiveAttack(0, 0);
  player.turn(0, 0, enemy);
  expect(enemy.getGameboard().getBoard()).toStrictEqual(board.getBoard());
});
