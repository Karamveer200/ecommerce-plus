import Categories from '../shared/Categories/Categories';
import { useMemo } from 'react';
import { useState } from 'react';
import FilterSection from './FilterSection/FilterSection';
import { useGetAllCategories } from '../../hooks/useGetAllCategories';
import { useGetAllProducts } from '../../hooks/useGetAllProducts';
import NoDataFound from '../shared/NoDataFound/NoDataFound';

export const PRODUCTS_TABS_TYPE = {
  GRID: 0,
  LIST: 1
};

export const SORTING_OPTIONS = [
  { value: 0, key: 'name', label: 'Name / Ascending', isAscending: true },
  { value: 1, key: 'name', label: 'Name / Descending', isAscending: false },
  { value: 2, key: 'price', label: 'Price / Ascending', isAscending: true },
  { value: 3, key: 'price', label: 'Price / Descending', isAscending: false },
  { value: 4, key: 'stars', label: 'Stars / Ascending', isAscending: true },
  { value: 5, key: 'stars', label: 'Stars / Descending', isAscending: false }
];

export const CATEGORY_DEFAULT_OPTIONS = { label: 'All', value: 'ALL' };

const ProductsList = () => {
  const [filters, setFilters] = useState({
    searchInput: '',
    sortType: SORTING_OPTIONS[0],
    categoryFilter: CATEGORY_DEFAULT_OPTIONS
  });

  const { allProducts: filteredProducts, isAllProductsFetching: isFilteredProductsFetching } =
    useGetAllProducts({
      params: {
        searchInput: filters.searchInput,
        sortKey: filters.sortType.key,
        sortOrder: filters.sortType.isAscending ? 'ASC' : 'DESC',
        categoryType:
          filters.categoryFilter.value === CATEGORY_DEFAULT_OPTIONS.value
            ? ''
            : filters.categoryFilter.value
      }
    });

  const { allCategories, isAllCategoriesFetching } = useGetAllCategories();

  const [layoutTab, setLayoutTab] = useState(PRODUCTS_TABS_TYPE.LIST);

  const groupedProductAndCategory = useMemo(
    () =>
      filteredProducts?.reduce((acc, item) => {
        if (!acc[item.categoryTitle]) {
          acc[item.categoryTitle] = [];
        }

        acc[item.categoryTitle].push(item);
        return acc;
      }, {}),
    [filteredProducts]
  );

  const renderProducts = () => {
    const categories = Object.keys(groupedProductAndCategory || {});

    const isLoading = isFilteredProductsFetching || isAllCategoriesFetching;

    if (isLoading) {
      return (
        <Categories
          isGridView={layoutTab === PRODUCTS_TABS_TYPE.GRID}
          isLoading={isFilteredProductsFetching || isAllCategoriesFetching}
        />
      );
    }

    return (
      <div
        className={`pt-[40px] flex flex-col ${
          layoutTab === PRODUCTS_TABS_TYPE.GRID
            ? 'gap-[80px] md:gap-[120px]'
            : 'gap-[50px] md:gap-[70px]'
        }`}>
        {filteredProducts?.length ? (
          categories?.map((category, index) => (
            <Categories
              key={index}
              label={category}
              products={groupedProductAndCategory[category]}
              isGridView={layoutTab === PRODUCTS_TABS_TYPE.GRID}
            />
          ))
        ) : (
          <div className="w-full mt-[20px]">
            <NoDataFound />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative z-10 bg-gray-100 pb-[100px] ">
      <div className="mt-[80px]">
        <FilterSection
          layoutTab={layoutTab}
          setLayoutTab={setLayoutTab}
          allCategories={allCategories}
          filters={filters}
          setFilters={setFilters}
        />

        {renderProducts()}
      </div>
    </div>
  );
};

export default ProductsList;
