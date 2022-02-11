import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';

const Routes = () => (
    <Switch>
        <Route path="/">
            <Route
                path="/items"
                render={({ match: { url } }) => (
                    <>
                        <Route
                            path={`${url}/add`}
                            component={ItemEditContainer}
                        />
                        {/* <Route path="*" component={NotFound} /> */}
                    </>
                )}
            />
            <ListContainer />
        </Route>
        <Redirect to="/" />
    </Switch>
);
export default Routes;
