import { createStore } from 'redux';
import reducer from './reducers/games';
import throttle from 'lodash/throttle';
import { baseUrl } from './config';

export function playSound(sound, volume = 50) {
  var sound_url = baseUrl + '/sound/' + sound;
  var audio = new Audio(sound_url);
  audio.volume = volume / 100.;
  audio.play()
}

const configureStore = () => {
  var store = createStore(reducer);

  store.subscribe(() => {
    const nextState = store.getState()

    if (nextState.sound_to_play !== undefined && nextState.sound_to_play !== null
      && nextState.sound_to_play !== "") {
      if (nextState.sound_on) {
        playSound(nextState.sound_to_play, nextState.volume);
      }
    }
  });
  return store;
}

export default configureStore;
