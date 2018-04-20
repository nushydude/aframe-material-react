import React from 'react';
import ReactDOM from 'react-dom';
import { initAFRAME } from './aframe';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

initAFRAME();

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
