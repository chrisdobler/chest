import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store';

const StoreInstance = Store();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={StoreInstance}>
            <App />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
