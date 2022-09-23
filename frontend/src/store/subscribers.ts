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
            currentValue: typeof value
        ) => void
    ) => {
        let currentValue: typeof value;
        function changeHandler(
            selector: (state: typeof initialState) => typeof value,
            onChangeHandler: (
                previousValue: typeof currentValue,
                currentValue: typeof value
            ) => void
        ) {
            const previousValue = currentValue;
            currentValue = selector(store.getState());

            if (previousValue !== currentValue) {
                onChangeHandler(previousValue, currentValue);
            }
        }
        store.subscribe(() => changeHandler(select, onChange));
    };

    subscriberCreator(
        (state) => state.location.selectedLocation,
        (previousValue, currentValue: LocationType) => {
            if (currentValue?.id)
                store.dispatch(actions.getItems(currentValue));
        }
    );
};
