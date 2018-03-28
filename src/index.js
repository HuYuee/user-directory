import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import UserDirec from './userlist';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserDirec />, document.getElementById('root'));
registerServiceWorker();
