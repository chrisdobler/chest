import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';

const Routes = () => (
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
        <Redirect to="/" />
    </Switch>
);
export default Routes;
