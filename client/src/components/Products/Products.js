import { assetManager } from '../../assets/assetManager';
import Divider from '../shared/Divider/Divider';
import Categories from '../shared/Categories/Categories';

const ProductsList = () => {
  return (
    <div className="relative z-10 bg-indigo-100 pb-[100px]">
      <div className="mt-[80px]">
        <div className="pt-[60px] md:pt-[90px] flex flex-col gap-[80px] md:gap-[120px]">
          <Categories label="Electronics" products={Object.values(assetManager.electronics)} />
          <Categories label="Clothing" products={Object.values(assetManager.clothing)} />
          <Categories label="Footwear" products={Object.values(assetManager.footWear)} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
