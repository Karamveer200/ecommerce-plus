import React, { createContext, useContext, useReducer } from 'react';
import productsReducer, { productInitialState } from './reducer';

//Prepare data layer
export const StateContext = createContext();

//Wrap data and serve data layer
export const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(productsReducer, productInitialState)}>
      {children}
    </StateContext.Provider>
  );
};

//Pull data layer
export const useProductsGlobalValue = () => useContext(StateContext);
