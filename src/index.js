import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import Token from './request';
import _get from 'lodash.get';
import './styles/_main.scss';

const request = new Token();

request.requestToken();

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
