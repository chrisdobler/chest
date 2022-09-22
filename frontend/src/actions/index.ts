import locationActions from './location';
import inventoryActions from './inventory';
import interfaceActions from './interface';
import itemActions from './item';

export default {
    ...locationActions,
    ...inventoryActions,
    ...interfaceActions,
    ...itemActions,
};
