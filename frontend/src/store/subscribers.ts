import { Store } from 'redux';

import actions from '../actions';

import { LocationType } from '../types/location';
import { initialState } from '../reducers/index';

export default (store: Store) => {
    let value: any;

    const subscriberCreator = (
        select: (state: typeof initialState) => typeof value,
        onChange: (
            previousValue: typeof currentValue,
            currentValue: typeof value,
            state: typeof initialState
        ) => void
    ) => {
        let currentValue: typeof value;
        function changeHandler(
            selector: (state: typeof initialState) => typeof value,
            onChangeHandler: (
                previousValue: typeof currentValue,
                currentValue: typeof value,
                state: typeof initialState
            ) => void
        ) {
            const previousValue = currentValue;
            currentValue = selector(store.getState());

            if (previousValue !== currentValue) {
                onChangeHandler(previousValue, currentValue, store.getState());
            }
        }
        store.subscribe(() => changeHandler(select, onChange));
    };

    subscriberCreator(
        (state) => state.location.selectedLocation?.id,
        (previousValue, currentValue: number) => {
            if (currentValue) {
                store.dispatch(actions.getItems(currentValue));
            }
        }
    );
    subscriberCreator(
        (state) => state.location.allLocations,
        (previousValue, currentValue: LocationType[], state) => {
            if (
                currentValue.length > 0 &&
                state.location?.selectedLocation?.id
            ) {
                store.dispatch(
                    actions.setLocationById(state.location.selectedLocation.id)
                );
            }
        }
    );
};
