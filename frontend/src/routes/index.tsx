import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ListContainer from '../containers/ListContainer';
import ItemEditContainer from '../containers/ItemEditContainer';

const Routelist = () => (
    <Routes>
        <Route path="/" />
        <Route
            path="items/*"
            element={
                <div>
                    <Routes>
                        <Route path="add" element={<ItemEditContainer />} />
                    </Routes>
                    <ListContainer />
                </div>
            }
        />
    </Routes>
);
export default Routelist;
