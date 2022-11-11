import GameBoard from './gameBoard';
import Ship from './ship';

describe('GameBoard: methods', () => {
  test('getBoard', () => {
    const gameBoard = GameBoard(4);
    expect(gameBoard.getBoard()).toStrictEqual([
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w'],
    ]);
  });
  describe('placeShip', () => {
    const ship1 = Ship(2);
    const ship2 = Ship(2);
    const ship3 = Ship(2);
    test('placing 1 ship', () => {
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameBoard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        ['w', 'w'],
      ]);
    });
    test('placing ship out of bounds', () => {
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 2, 1)).toBe(false);
      expect(gameBoard.placeShip(ship1, 1, 2, 'v')).toBe(false);
      expect(gameBoard.getBoard()).toStrictEqual([
        ['w', 'w'],
        ['w', 'w'],
      ]);
    });
    test('placing ship partianaly out of bounds', () => {
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 1, 1, 'h')).toBe(false);
      expect(gameBoard.placeShip(ship1, 1, 1, 'v')).toBe(false);
      expect(gameBoard.getBoard()).toStrictEqual([
        ['w', 'w'],
        ['w', 'w'],
      ]);
    });
    test('placing 2 ships', () => {
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameBoard.placeShip(ship2, 0, 1)).toBe(true);
      expect(gameBoard.getBoard()).toStrictEqual([
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
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 0, 0)).toBe(true);
      expect(gameBoard.placeShip(ship2, 0, 0)).toBe(false);
      expect(gameBoard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        ['w', 'w'],
      ]);
    });
    test('no ship bordering', () => {
      const gameBoard = GameBoard(2);
      expect(gameBoard.placeShip(ship1, 0, 0, 'h')).toBe(true);
      expect(gameBoard.placeShip(ship2, 0, 1, 'h', false)).toBe(false);
      expect(gameBoard.getBoard()).toStrictEqual([
        [
          { ship: ship1, x: 0, y: 0, dir: 'h' },
          { ship: ship1, x: 0, y: 0, dir: 'h' },
        ],
        ['w', 'w'],
      ]);
      const gameBoard2 = GameBoard(6);
      expect(gameBoard2.placeShip(ship1, 2, 2, 'h')).toBe(true);
      expect(gameBoard2.placeShip(ship2, 4, 2, 'h', false)).toBe(false);
      expect(gameBoard2.placeShip(ship3, 0, 2, 'h', false)).toBe(false);
      expect(gameBoard2.placeShip(ship2, 2, 0, 'v', false)).toBe(false);
      expect(gameBoard2.placeShip(ship3, 2, 3, 'v', false)).toBe(false);
    });
  });
  describe('placeShipRandomly', () => {
    test('shipPlacement', () => {
      const gameBoard = GameBoard(1);
      const ship1 = Ship(1);
      const ship2 = Ship(1);
      expect(gameBoard.placeShipRandomly(ship1)).toBe(true);
      expect(gameBoard.placeShipRandomly(ship2)).toBe(false);
      expect(gameBoard.getBoard()[0][0].ship).toStrictEqual(ship1);
    });
  });
  test('receiveAttack miss', () => {
    const gameBoard = GameBoard(3);
    expect(gameBoard.receiveAttack(0, 0)).toBe('miss');
    expect(gameBoard.getBoard()).toStrictEqual([
      ['m', 'w', 'w'],
      ['w', 'w', 'w'],
      ['w', 'w', 'w'],
    ]);
  });
  test('receiveAttack hit', () => {
    const ship = Ship(2);
    const gameBoard = GameBoard(2);
    gameBoard.placeShip(ship, 0, 0, 'v');
    expect(gameBoard.receiveAttack(0, 0)).toBe('hit');
    expect(ship.getHits()).toStrictEqual([true, false]);
    expect(gameBoard.getBoard()).toStrictEqual([
      ['h', 'w'],
      [{ ship, x: 0, y: 0, dir: 'v' }, 'w'],
    ]);
  });
  test('receiveAttack on same place', () => {
    const ship = Ship(2);
    const gameBoard = GameBoard(2);
    gameBoard.placeShip(ship, 0, 0, 'v');
    expect(gameBoard.receiveAttack(0, 0)).toBe('hit');
    expect(gameBoard.receiveAttack(0, 0)).toBe('already attacked');
    expect(gameBoard.receiveAttack(1, 1)).toBe('miss');
    expect(gameBoard.receiveAttack(1, 1)).toBe('already attacked');
    expect(ship.getHits()).toStrictEqual([true, false]);
    expect(gameBoard.getBoard()).toStrictEqual([
      ['h', 'w'],
      [{ ship, x: 0, y: 0, dir: 'v' }, 'm'],
    ]);
  });
  test('AllShipSunk', () => {
    const ship = Ship(2);
    const gameBoard = GameBoard(2);
    gameBoard.placeShip(ship, 0, 0, 'h');
    expect(gameBoard.areAllShipsSunk()).toBe(false);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.areAllShipsSunk()).toBe(false);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.areAllShipsSunk()).toBe(true);
  });
});
