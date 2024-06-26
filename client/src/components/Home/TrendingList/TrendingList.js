import Divider from '../../shared/Divider/Divider';
import Categories from '../../shared/Categories/Categories';
import { useMemo } from 'react';
import Button from '../../shared/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ALL_ROUTES_PATHS } from '../../../config/routes';
import { useGetAllProducts } from '../../../hooks/useGetAllProducts';

const TrendingList = () => {
  const { allProducts, isAllProductsFetching } = useGetAllProducts();

  const navigate = useNavigate();

  const sortedProductsByStarRanking = useMemo(
    () => allProducts?.sort((a, b) => b.stars - a.stars) || [],
    [allProducts]
  );

  const getTrendingProducts = () => {
    switch (true) {
      case sortedProductsByStarRanking?.length > 8: {
        return sortedProductsByStarRanking.slice(0, 8);
      }
      default:
        return sortedProductsByStarRanking;
    }
  };

  return (
    <div className="relative z-10 bg-white pb-[70px]">
      <Divider />
      <div className="mt-[80px]">
        <div className="pt-[60px] md:pt-[90px] flex flex-col gap-[80px] md:gap-[120px]">
          <Categories
            label="Trending"
            products={getTrendingProducts()}
            isLoading={isAllProductsFetching}
          />
        </div>
      </div>
      <div className="py-[90px] rounded-lg bg-gray-800 mx-[70px] mt-[50px] flex flex-col items-center justify-center gap-[40px]">
        <p className="text-center text-2xl sm:text-3xl lg:text-4xl text-white">
          We got it all. Click below to view more products
        </p>
        <Button onClick={() => navigate(ALL_ROUTES_PATHS.PRODUCTS)}>Explore More</Button>
      </div>
    </div>
  );
};

export default TrendingList;
