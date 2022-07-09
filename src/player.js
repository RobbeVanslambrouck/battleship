import Gameboard from './gameboard';

const Player = (name) => {
  let thisName = name;
  let gameboard = Gameboard(10);
  const getName = () => thisName;
  const SetName = (newName) => {
    thisName = newName;
  };
  const getGameboard = () => gameboard;
  const setGameboard = (NewBoard) => {
    gameboard = NewBoard;
  };

  const turn = (x, y, enemy) => {
    enemy.getGameboard().receiveAttack(x, y);
  };

  return { getName, SetName, getGameboard, setGameboard, turn };
};

export default Player;
