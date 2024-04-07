/* eslint-disable no-case-declarations */
import { ACTION_TYPES, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/helperFunctions';

export const productInitialState = {
  basket: getLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET) || []
};

const productsReducer = (state, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TO_BASKET: {
      const item = { ...action.item, purchaseQuantity: 1 };
      const data = [...state.basket, item];

      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, data);

      return {
        ...state,
        basket: data
      };
    }
    case ACTION_TYPES.ADD_QUANTITY: {
      const updatedQuantity = action.item.purchaseQuantity + 1;

      if (updatedQuantity > action.item.quantity) return state;

      const item = { ...action.item, purchaseQuantity: updatedQuantity };
      const data = state.basket.map((product) => (product.id === item.id ? item : product));

      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, data);

      return {
        ...state,
        basket: data
      };
    }
    case ACTION_TYPES.REMOVE_QUANTITY: {
      if (action.item.purchaseQuantity < 2) return state;

      const item = { ...action.item, purchaseQuantity: action.item.purchaseQuantity - 1 };
      const data = state.basket.map((product) => (product.id === item.id ? item : product));

      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, data);

      return {
        ...state,
        basket: data
      };
    }
    case ACTION_TYPES.REMOVE_FROM_BASKET: {
      let tempBasket = [...state.basket];
      const filteredBasket = tempBasket.filter((item) => item.id !== action.item?.id);

      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, filteredBasket);

      return {
        ...state,
        basket: filteredBasket
      };
    }
    case ACTION_TYPES.EMPTY_BASKET: {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, []);

      return {
        ...state,
        basket: []
      };
    }
    default: {
      return state;
    }
  }
};

export default productsReducer;
