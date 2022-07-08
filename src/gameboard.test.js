import Gameboard from './gameboard';
import Ship from './ship';

describe('Gameboard: methodes', () => {
  test('getBoard', () => {
    const gameboard = Gameboard(4);
    expect(gameboard.getBoard()).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
  describe('placeShip', () => {
    const ship1 = Ship(2);
    const ship2 = Ship(2);
    test('placing 1 ship', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.getBoard()).toStrictEqual([
        [1, 1],
        [0, 0],
      ]);
    });
    test('placing ship out of bounds', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 2, 1)).toBe(false);
      expect(gameboard.placeShip(ship1, 1, 2, 'v')).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        [0, 0],
        [0, 0],
      ]);
    });
    test('placing ship partianaly out of bounds', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 1, 1)).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        [0, 0],
        [0, 0],
      ]);
    });
    test('placing 2 ships', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.placeShip(ship2, 0, 1)).toBe(true);
      expect(gameboard.getBoard()).toStrictEqual([
        [1, 1],
        [2, 2],
      ]);
    });
    test('placing overlapping ships', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.placeShip(ship2, 0, 0)).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        [1, 1],
        [0, 0],
      ]);
    });
  });
  test('receiveAttack miss', () => {
    const gameboard = Gameboard(3);
    expect(gameboard.receiveAttack(0, 0)).toBe('miss');
    expect(gameboard.getBoard()).toStrictEqual([
      [-1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
  test('receiveAttack hit', () => {
    const ship = Ship(2);
    const gameboard = Gameboard(2);
    gameboard.placeShip(ship, 0, 0, 'v');
    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(ship.getHits()).toStrictEqual([true, false]);
    expect(gameboard.getBoard()).toStrictEqual([
      [1, 0],
      [1, 0],
    ]);
  });
  test('receiveAttack on same place', () => {
    const ship = Ship(2);
    const gameboard = Gameboard(2);
    gameboard.placeShip(ship, 0, 0, 'v');
    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(gameboard.receiveAttack(0, 0)).toBe('already attacked');
    expect(gameboard.receiveAttack(1, 1)).toBe('miss');
    expect(gameboard.receiveAttack(1, 1)).toBe('already attacked');
    expect(ship.getHits()).toStrictEqual([true, false]);
    expect(gameboard.getBoard()).toStrictEqual([
      [1, 0],
      [1, -1],
    ]);
  });
  test('AllShipSunk', () => {
    const ship = Ship(2);
    const gameboard = Gameboard(2);
    gameboard.placeShip(ship, 0, 0, 'h');
    expect(gameboard.areAllShipsSunk()).toBe(false);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.areAllShipsSunk()).toBe(false);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
