import React from 'react';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={ListContainer}>
      <Route path="/items" component={ListContainer}>
        <Route path="/add" component={ItemEditContainer} />
        {/* <Route path="*" component={NotFound} /> */}
      </Route>
    </Route>
  </Router>
);
export default Routes;
