import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/app/app';
import rootReducer from './store/reducers';
import reducer from './store/reducer';


const logger = (store) => (next) => (action) => {
  const result = next(action);
  console.log(store.getState());
  return result;
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
