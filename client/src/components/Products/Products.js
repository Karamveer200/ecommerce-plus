import Categories from '../shared/Categories/Categories';
import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import FilterSection from './FilterSection/FilterSection';
import { useProductsGlobalValue } from '../../store/StateProvider';

export const PRODUCTS_TABS_TYPE = {
  GRID: 0,
  LIST: 1
};

const ProductsList = () => {
  const [{ allProducts }] = useProductsGlobalValue();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [layoutTab, setLayoutTab] = useState(PRODUCTS_TABS_TYPE.LIST);

  useEffect(() => {
    allProducts && setFilteredProducts(allProducts);
  }, [allProducts]);

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
    const categories = Object.keys(groupedProductAndCategory) || [];

    return (
      <div
        className={`pt-[40px] flex flex-col ${
          layoutTab === PRODUCTS_TABS_TYPE.GRID
            ? 'gap-[80px] md:gap-[120px]'
            : 'gap-[50px] md:gap-[70px]'
        }`}>
        {categories?.map((category, index) => (
          <Categories
            key={index}
            label={category}
            products={groupedProductAndCategory[category]}
            isGridView={layoutTab === PRODUCTS_TABS_TYPE.GRID}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative z-10 bg-gray-100 pb-[100px]">
      <div className="mt-[80px]">
        <FilterSection
          layoutTab={layoutTab}
          setLayoutTab={setLayoutTab}
          setFilteredProducts={setFilteredProducts}
        />

        {renderProducts()}
      </div>
    </div>
  );
};

export default ProductsList;
