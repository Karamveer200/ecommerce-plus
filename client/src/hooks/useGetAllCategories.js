import { useQuery } from 'react-query';

import { getAllCategories } from '../config/services/categories';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const useGetAllCategories = (rest = {}) => {
  const { data: allCategories, isFetching: isAllCategoriesFetching } = useQuery(
    [GET_ALL_CATEGORIES],
    () => getAllCategories(),
    rest
  );

  return {
    allCategories,
    isAllCategoriesFetching
  };
};
