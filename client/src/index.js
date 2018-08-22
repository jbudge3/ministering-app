import React from 'react';
import ReactDOM from 'react-dom';
import {Ministering} from './components/ministering.react/index.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Ministering />, document.getElementById('root'));
registerServiceWorker();
