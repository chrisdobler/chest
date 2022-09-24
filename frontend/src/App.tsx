import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import Routes from './routes/index';

import AppBar from './layout/AppBar';
import theme from './theme';

const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <div className="App">
                <header className="App-header">
                    <AppBar />
                </header>
                <div className="appBody">
                    <Routes />
                </div>
            </div>
        </Router>
    </ThemeProvider>
);

export default App;
