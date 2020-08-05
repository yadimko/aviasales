import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import store from './store/store';


const update = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}
update();
store.subscribe(update)

