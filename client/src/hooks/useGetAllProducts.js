import { useQuery } from 'react-query';

import { getAllProducts } from '../config/services/products';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const useGetAllProducts = (rest = {}) => {
  const { data: allProducts, isFetching: isAllProductsFetching } = useQuery(
    [GET_ALL_PRODUCTS],
    () => getAllProducts(),
    rest
  );

  return {
    allProducts,
    isAllProductsFetching
  };
};
