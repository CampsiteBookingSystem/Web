import React from 'react';
import ReactDOM from 'react-dom';

import './plugins/fetchIntercept';
import * as serviceWorker from './plugins/serviceWorker';

import App from './components/App';

import 'sanitize.css/sanitize.css';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
