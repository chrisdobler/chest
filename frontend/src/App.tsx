import React from 'react';
import logo from './logo.svg';
import './App.css';

import { browserHistory } from 'react-router';
import Routes from './routes';

import AppBar from './layout/AppBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes history={browserHistory} />
      <header className="App-header">
        <AppBar />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
