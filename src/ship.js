const Ship = (length) => {
  const hits = [];
  for (let i = 0; i < length; i += 1) {
    hits[i] = false;
  }

  const getLength = () => length;
  const getHits = () => hits;

  const isHitAt = (place) => hits[place];

  const hitAt = (place) => {
    if (hits[place]) {
      return false;
    }
    hits[place] = true;
    return true;
  };

  const isSunk = () => {
    for (let i = 0; i < length; i += 1) {
      if (!hits[i]) {
        return false;
      }
    }
    return true;
  };

  return { getLength, getHits, hitAt, isSunk, isHitAt };
};

export default Ship;
