/* eslint-disable no-case-declarations */
import { ACTION_TYPES, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/helperFunctions';

export const productInitialState = {
  allProducts: [],
  inStockProducts: [],
  basket: getLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET) || []
};

//Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const productsReducer = (state, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
        inStockProducts: action.products?.filter((item) => !!item.quantity)
      };
    case ACTION_TYPES.SET_IN_STOCK_PRODUCTS:
      return {
        ...state,
        inStockProducts: action.products?.filter((item) => !!item.quantity)
      };
    case ACTION_TYPES.ADD_TO_BASKET:
      const data = [...state.basket, action.item];
      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, data);

      return {
        ...state,
        basket: data
      };

    case ACTION_TYPES.REMOVER_FROM_BASKET:
      let tempBasket = [...state.basket];
      const filteredBasket = tempBasket.filter((item) => item.id !== action.item?.id);

      setLocalStorageItem(LOCAL_STORAGE_KEYS.BASKET, filteredBasket);

      return {
        ...state,
        basket: filteredBasket
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      };
    default:
  }
};

export default productsReducer;
