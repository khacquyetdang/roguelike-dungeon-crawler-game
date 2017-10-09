import { createStore } from 'redux';
import reducer from './reducers/games';
import throttle from 'lodash/throttle';

const configureStore = () => {
  var store = createStore(reducer);
  return store;
}

export default configureStore;
