import { useQuery } from '@tanstack/react-query';

import { getAllProducts } from '../config/services/products';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const useGetAllProducts = (args = {}) => {
  const { params, ...rest } = args;

  const { data: allProducts, isFetching: isAllProductsFetching } = useQuery({
    queryKey: [GET_ALL_PRODUCTS, params],
    queryFn: ({ signal }) => getAllProducts({ signal, params }),
    ...rest
  });

  return {
    allProducts,
    isAllProductsFetching
  };
};
