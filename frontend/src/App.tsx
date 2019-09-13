import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import AppBar from './layout/AppBar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppBar />
        </header>
        <body className="appBody">
          <Routes />
        </body>
      </div>
    </Router>
  );
};

export default App;
