import React from 'react';
import './App.css';

import Routes from './routes';

import AppBar from './layout/AppBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar />
      </header>
      <body className="appBody">
        <Routes />
      </body>
    </div>
  );
};

export default App;
