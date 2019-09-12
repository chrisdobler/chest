import React from 'react';
import { Router, Route } from 'react-router';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={ListContainer}>
      <Route path="/contact" component={Contact} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
export default Routes;
