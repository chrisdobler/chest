import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';
import LocationEditContainer from '../containers/LocationEditContainer';

const Routelist = () => (
    <Routes>
        <Route path="/" element={<ListContainer />} />
        <Route
            path="items/*"
            element={
                <div>
                    <Routes>
                        <Route path="add" element={<ItemEditContainer />} />
                        <Route path=":itemId" element={<ItemEditContainer />} />
                    </Routes>
                    <ListContainer />
                </div>
            }
        />
        <Route
            path="locations/*"
            element={
                <div>
                    <Routes>
                        <Route path="add" element={<LocationEditContainer />} />
                        <Route
                            path=":locationId"
                            element={<LocationEditContainer />}
                        />
                    </Routes>
                    <ListContainer />
                </div>
            }
        />
    </Routes>
);
export default Routelist;
