import React from 'react';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

const Routes = (props) => (
    <Switch>
        <Route path="/" component={ListContainer}>
            <Route
                path="/items"
                render={({ match: { url } }) => (
                    <>
                        <Route
                            path={`${url}/`}
                            component={ListContainer}
                            exact
                        />
                        <Route
                            path={`${url}/add`}
                            component={ItemEditContainer}
                        />
                    </>
                )}
            >
                {/* <Route path="/items/add" component={ItemEditContainer} /> */}
                {/* <Route path="*" component={NotFound} /> */}
            </Route>
        </Route>
        <Redirect to={'/'} />
    </Switch>
);
export default Routes;
