import Gameboard from './gameboard';
import Ship from './ship';

describe('Gameboard: methodes', () => {
  test('getBoard', () => {
    const gameboard = Gameboard(4);
    expect(gameboard.getBoard()).toStrictEqual([
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
    ]);
  });
  describe('placeShip', () => {
    const ship1 = Ship(2);
    const ship2 = Ship(2);
    test('placing 1 ship', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        ['w', 'w'],
      ]);
    });
    test('placing ship out of bounds', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 2, 1)).toBe(false);
      expect(gameboard.placeShip(ship1, 1, 2, 'v')).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        ['w', 'w'],
        ['w', 'w'],
      ]);
    });
    test('placing ship partianaly out of bounds', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 1, 1)).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        ['w', 'w'],
        ['w', 'w'],
      ]);
    });
    test('placing 2 ships', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.placeShip(ship2, 0, 1)).toBe(true);
      expect(gameboard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        [
          { ship: ship2, x: 0, y: 1, dir: 'h' },
          { ship: ship2, x: 0, y: 1, dir: 'h' },
        ],
      ]);
    });
    test('placing overlapping ships', () => {
      const gameboard = Gameboard(2);
      expect(gameboard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameboard.placeShip(ship2, 0, 0)).toBe(false);
      expect(gameboard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        ['w', 'w'],
      ]);
    });
  });
  test('receiveAttack miss', () => {
    const gameboard = Gameboard(3);
    expect(gameboard.receiveAttack(0, 0)).toBe('miss');
    expect(gameboard.getBoard()).toStrictEqual([
      ['m', 'w', 'w'],
      ['w', 'w', 'w'],
      ['w', 'w', 'w'],
    ]);
  });
  test('receiveAttack hit', () => {
    const ship = Ship(2);
    const gameboard = Gameboard(2);
    gameboard.placeShip(ship, 0, 0, 'v');
    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(ship.getHits()).toStrictEqual([true, false]);
    expect(gameboard.getBoard()).toStrictEqual([
      ['h', 'w'],
      [{ ship, x: 0, y: 0, dir: 'v' }, 'w'],
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
      ['h', 'w'],
      [{ ship, x: 0, y: 0, dir: 'v' }, 'm'],
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
