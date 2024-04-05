import { assetManager } from '../../../assets/assetManager';
import Divider from '../../shared/Divider/Divider';

const Card = ({ item }) => {
  return (
    <div className="h-[500px] bg-gray-200 group rounded-lg hover:bg-gray-800 transition-all duration-200 ease-linear cursor-pointer">
      <div className="h-[83%] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-400 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item}
          className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-200 ease-linear"
        />
      </div>
      <div className="flex gap-[20px] h-[18%] p-4 group-hover:text-white transition-all duration-200 ease-linear">
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold text-xl">I am name</p>
          <p className="text-lg">Stock left- 5</p>
        </div>

        <div className="flex">
          <p className="text-3xl font-bold text-center my-auto">$20</p>
        </div>
      </div>
    </div>
  );
};

const ProductsList = () => {
  const renderCategory = ({ label, products }) => {
    return (
      <div className="flex flex-col gap-[20px] w-full px-[70px]">
        <p className="text-gray-800 font-bold text-4xl">{label}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-[25px] md:gap-[35px] 2xl:gap-[40px]">
          {products?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    );
  };

  const trending = [
    assetManager.clothing.yellowShirt,
    assetManager.electronics.speakers,
    assetManager.footWear.redShoe,
    assetManager.clothing.whiteHoodie
  ];

  return (
    <div className="relative z-10 bg-white pb-[100px]">
      <Divider />
      <div className="mt-[80px]">
        <div className="pt-[60px] md:pt-[90px] flex flex-col gap-[80px] md:gap-[120px]">
          {renderCategory({ label: 'Trending', products: trending })}
          {renderCategory({
            label: 'Electronics',
            products: Object.values(assetManager.electronics)
          })}
          {renderCategory({ label: 'Footwear', products: Object.values(assetManager.footWear) })}
          {renderCategory({ label: 'Clothing', products: Object.values(assetManager.clothing) })}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
