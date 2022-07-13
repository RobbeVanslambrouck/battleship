export default function shuffle(array) {
  const shuffledArray = array;
  for (let i = array.length - 1; i > 0; i -= 1) {
    // Pick a remaining element.
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // And swap it with the current element.
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      array[randomIndex],
      array[i],
    ];
  }

  return shuffledArray;
}
