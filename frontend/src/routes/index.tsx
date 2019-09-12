import React from 'react';

import ListContainer from '../containers/ListContainer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={ListContainer}>
    </Route>
  </Router>
);
export default Routes;
