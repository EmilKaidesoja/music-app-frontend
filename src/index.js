import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//this is the base url for all the music match fetches
axios.defaults.baseURL = 'https://evening-temple-64997.herokuapp.com/api.musixmatch.com/ws/1.1/';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
