import { useQuery } from '@tanstack/react-query';

import { getAllCategories } from '../config/services/categories';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const useGetAllCategories = (rest = {}) => {
  const { data: allCategories, isFetching: isAllCategoriesFetching } = useQuery({
    queryKey: [GET_ALL_CATEGORIES],
    queryFn: getAllCategories,
    ...rest
  });

  return {
    allCategories,
    isAllCategoriesFetching
  };
};
