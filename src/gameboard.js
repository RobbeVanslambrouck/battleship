const Gameboard = (size = 10) => {
  const board = [];
  for (let i = 0; i < size; i += 1) {
    board[i] = new Array(size).fill('w');
  }

  const ships = [];

  const getBoard = () => board;

  const receiveAttack = (x, y) => {
    if (board[y][x] === 'w') {
      board[y][x] = 'm';
      return 'miss';
    }

    if (board[y][x] === 'm' || board[y][x] === 'h') {
      return 'already attacked';
    }

    const shipInfo = board[y][x];
    let place = 0;

    if (shipInfo.dir.match(/^(horizontal|h)$/i)) {
      place = x - shipInfo.x;
    }
    if (shipInfo.dir.match(/^(vertical|v)$/i)) {
      place = y - shipInfo.y;
    }

    shipInfo.ship.hitAt(place);
    board[y][x] = 'h';
    return 'hit';
  };

  const canPlaceShip = (ship, x, y, dir) => {
    let posX = x;
    let posY = y;
    if (x >= size || y >= size) {
      return false;
    }
    for (let i = 0; i < ship.getLength(); i += 1) {
      if (board[posY][posX] !== 'w') {
        return false;
      }
      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
    return true;
  };
  const placeShipOnGameboard = (ship, x, y, dir) => {
    let posX = x;
    let posY = y;
    ships.push({ ship, x, y, dir });
    for (let i = 0; i < ship.getLength(); i += 1) {
      board[posY][posX] = ships[ships.length - 1];
      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
  };

  const placeShip = (ship, x, y, dir = 'h') => {
    if (canPlaceShip(ship, x, y, dir)) {
      placeShipOnGameboard(ship, x, y, dir);
      return true;
    }
    return false;
  };

  const areAllShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      if (!ships[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  return { getBoard, receiveAttack, placeShip, areAllShipsSunk };
};

export default Gameboard;
