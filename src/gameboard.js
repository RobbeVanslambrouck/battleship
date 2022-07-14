import shuffle from './helper';

/*
  the gameboard is an array were the cells are: 
  - 'w' (water)
  - 'h' (hit)
  - 'm' (miss)
  - { ship, x, y, dir} (a ship object with the coordinates of the fist schip section and its direction either 'h' or 'v')
*/
const Gameboard = (size = 10) => {
  const board = [];
  for (let i = 0; i < size; i += 1) {
    board[i] = new Array(size).fill('w');
  }

  const ships = [];

  const getBoard = () => board;

  const placeSunkShipOnGameboard = ({ ship, x, y, dir }) => {
    let posX = x;
    let posY = y;
    for (let i = 0; i < ship.getLength(); i += 1) {
      board[posY][posX] = 's';
      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
  };

  const receiveAttack = (x, y) => {
    if (board[y][x] === 'w') {
      board[y][x] = 'm';
      return 'miss';
    }

    if (board[y][x] === 'm' || board[y][x] === 'h' || board[y][x] === 's') {
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
    if (shipInfo.ship.isSunk()) {
      placeSunkShipOnGameboard(shipInfo);
      board[y][x] = 's';
      return 'hit and sunk';
    }
    board[y][x] = 'h';
    return 'hit';
  };

  const canPlaceShip = (ship, x, y, dir, allowShipBordering = true) => {
    if (x >= size || y >= size) {
      return false;
    }
    if (!allowShipBordering) {
      if (dir.match(/^(horizontal|h)$/i)) {
        if (x - 1 >= 0 && typeof board[y][x - 1] === 'object') return false;
        if (
          x + ship.getLength() < size &&
          typeof board[y][x + ship.getLength()] === 'object'
        )
          return false;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        if (y - 1 >= 0 && typeof board[y - 1][x] === 'object') return false;
        if (
          y + ship.getLength() < size &&
          typeof board[y + ship.getLength()][x] === 'object'
        )
          return false;
      }
    }
    let posX = x;
    let posY = y;
    for (let i = 0; i < ship.getLength(); i += 1) {
      if (posY >= size || posX >= size || board[posY][posX] !== 'w') {
        return false;
      }
      if (dir.match(/^(horizontal|h)$/i)) {
        if (
          !allowShipBordering &&
          posY + 1 < size &&
          typeof board[posY + 1][posX] === 'object'
        )
          return false;
        if (
          !allowShipBordering &&
          posY - 1 >= 0 &&
          typeof board[posY - 1][posX] === 'object'
        )
          return false;
        posX += 1;
      }
      if (dir.match(/^(vertical|v)$/i)) {
        if (
          !allowShipBordering &&
          posX + 1 < size &&
          typeof board[posY][posX + 1] === 'object'
        )
          return false;
        if (
          !allowShipBordering &&
          posX - 1 >= 0 &&
          typeof board[posY][posX - 1] === 'object'
        )
          return false;
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

  const placeShip = (ship, x, y, dir = 'h', allowShipBordering = true) => {
    if (canPlaceShip(ship, x, y, dir, allowShipBordering)) {
      placeShipOnGameboard(ship, x, y, dir);
      return true;
    }
    return false;
  };

  const getTiles = (type) => {
    const tiles = [];
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board.length; x += 1) {
        if (board[y][x] === type) {
          tiles.push({ x, y });
        }
      }
    }
    return tiles;
  };

  const placeShipRandomly = (ship) => {
    const availableTiles = shuffle(getTiles('w'));
    const directions = shuffle(['h', 'v']);
    let dir;
    let pos;
    while (availableTiles.length > 0) {
      pos = availableTiles.pop();
      // eslint-disable-next-line prefer-destructuring
      dir = directions[1];
      if (!canPlaceShip(ship, pos.x, pos.y, dir, false)) {
        // eslint-disable-next-line prefer-destructuring
        dir = directions[0];
      }
      if (canPlaceShip(ship, pos.x, pos.y, dir, false)) {
        placeShipOnGameboard(ship, pos.x, pos.y, dir);
        return true;
      }
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

  return {
    getBoard,
    receiveAttack,
    placeShip,
    placeShipRandomly,
    areAllShipsSunk,
  };
};

export default Gameboard;
