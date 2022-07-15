import PubSub from 'pubsub-js';
import DomElements from './domElements';
import Game from './game';

const App = (() => {
  const showHomeScreen = () => {
    const PLAY_GAME_TOPIC = 'btnPlayGame';
    const gameModes = Game.getGameModes().map((mode) =>
      mode.toLocaleLowerCase().replaceAll('_', ' ')
    );
    DomElements.renderHomePage(PLAY_GAME_TOPIC, gameModes);

    let playGameToken = '';
    console.log(PLAY_GAME_TOPIC);
    playGameToken = PubSub.subscribe(PLAY_GAME_TOPIC, (msg, data) => {
      const gameMode = data.gameMode.replaceAll(' ', '_').toUpperCase();
      PubSub.unsubscribe(playGameToken);
      Game.setGameMode(gameMode);
      Game.startGame();
    });
  };

  const start = () => {
    showHomeScreen();
  };

  return { showHomeScreen, start };
})();

export default App;
