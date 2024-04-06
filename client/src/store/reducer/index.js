/* eslint-disable no-case-declarations */
import { ACTION_TYPES } from '../../utils/constants';

export const productInitialState = {
  allProducts: [],
  basket: []
};

//Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const productsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products
      };
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((item) => item.id === action.id);
      let tempBasket = [...state.basket];
      if (index >= 0) {
        tempBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product with id - ${action.id}`);
      }
      return {
        ...state,
        basket: tempBasket
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
