const Gameboard = (size = 10) => {
  const board = [];
  for (let i = 0; i < size; i += 1) {
    board[i] = new Array(size).fill(0);
  }
  const ships = { freeKey: 1 };

  const getBoard = () => board;

  const receiveAttack = (x, y) => {
    if (board[y][x] === 0) {
      board[y][x] = -1;
      return 'miss';
    }
    if (board[y][x] === -1) {
      return 'already attacked';
    }
    const shipKey = board[y][x];
    const shipInfo = ships[shipKey];
    let place = 0;
    if (shipInfo.dir.match(/^(horizontal|h)$/i)) {
      place = x - shipInfo.x;
    }
    if (shipInfo.dir.match(/^(vertical|v)$/i)) {
      place = y - shipInfo.y;
    }
    if (shipInfo.ship.isHitAt(x - shipInfo.x)) {
      return 'already attacked';
    }
    shipInfo.ship.hitAt(place);
    return 'hit';
  };

  const canPlaceShip = (ship, x, y, dir) => {
    if (x >= size || y >= size) {
      return false;
    }
    if (dir.match(/^(horizontal|h)$/i)) {
      let posX = x;
      if (x + ship.getLength() > size) {
        return false;
      }
      for (let i = 0; i < ship.getLength(); i += 1) {
        if (board[y][posX] !== 0) {
          return false;
        }
        posX += 1;
      }
    }
    if (dir.match(/^(vertical|v)$/i)) {
      let posY = y;
      if (y + ship.getLength() > size) {
        return false;
      }
      for (let i = 0; i < ship.getLength(); i += 1) {
        if (board[posY][x] !== 0) {
          return false;
        }
        posY += 1;
      }
    }

    return true;
  };
  const placeShipOnGameboard = (ship, x, y, dir) => {
    let posX = x;
    let posY = y;
    const key = ships.freeKey;
    ships[key] = { ship, x: posX, y: posY, dir };
    for (let i = 0; i < ship.getLength(); i += 1) {
      board[posY][posX] = key;
      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
    ships.freeKey += 1;
  };

  const placeShip = (ship, x, y, dir = 'h') => {
    if (canPlaceShip(ship, x, y, dir)) {
      placeShipOnGameboard(ship, x, y, dir);
      return true;
    }
    return false;
  };

  const areAllShipsSunk = () => {
    for (let i = 1; i < ships.freeKey; i += 1) {
      if (!ships[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  return { getBoard, receiveAttack, placeShip, areAllShipsSunk };
};

export default Gameboard;
