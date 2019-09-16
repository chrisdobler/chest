import * as Types from '../types/inventory';
// src/actions/cart.js
export const addItemToInventory = (item: Types.Item) => {
  console.log('adding item:', item);
  return {
    type: 'add',
    item
  };
};
