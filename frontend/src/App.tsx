import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Routes from './routes/index';

import AppBar from './layout/AppBar';

const muiTheme = getMuiTheme({
    palette: {
        // textColor: cyan500,
        // primary1Color: cyan500,
        // primary2Color: cyan500,
        // accent1Color: cyan500,
        // pickerHeaderColor: cyan500,
        // alternateTextColor: cyan500,
        // contrastText: 'rgba(0,0,0,0.8)'
    },
    appBar: {
        // height: 60
    },
});

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
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
    </MuiThemeProvider>
);

export default App;
