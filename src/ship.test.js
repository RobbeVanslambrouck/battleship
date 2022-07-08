import Ship from './ship';

describe('Ship: values and methodes', () => {
  test('ship length', () => {
    const ship = Ship(2);
    expect(ship.getLength()).toBe(2);
  });
  describe('method: hitAt', () => {
    test('hitting unhit place', () => {
      const ship = Ship(2);
      expect(ship.hitAt(0)).toBe(true);
      expect(ship.getHits()).toStrictEqual([true, false]);
    });
    test('hitting hit place', () => {
      const ship = Ship(2);
      ship.hitAt(0);
      expect(ship.hitAt(0)).toBe(false);
      expect(ship.getHits()).toStrictEqual([true, false]);
    });
  });
  describe('method: isSunk', () => {
    test('sunk ship', () => {
      const sunkShip = Ship(1);
      sunkShip.hitAt(0);
      expect(sunkShip.isSunk()).toBe(true);
    });
    test('unsunk ship', () => {
      const unsunkShip = Ship(2, [false, false]);
      expect(unsunkShip.isSunk()).toBe(false);
    });
  });
});
