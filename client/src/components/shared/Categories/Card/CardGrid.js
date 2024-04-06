import Stars from './Stars/Stars';
import { assetManager } from '../../../../assets/assetManager';
import StockRemaining from './StockRemaining/StockRemaining';

const CardGrid = ({ item, onClick, basket = [] }) => {
  const isItemInBasket = basket.find((product) => product.id === item.id);

  return (
    <div
      className={`h-[500px] bg-gray-200 group rounded-lg hover:bg-gray-400 transition-all duration-200 
      ease-linear cursor-pointer shadow-lg fadeInHalfSecondCards ${
        isItemInBasket && 'bg-green-300 hover:bg-green-300 relative rounded-s-lg'
      }`}
      onClick={() => onClick(item)}>
      {isItemInBasket && (
        <div
          className="h-full justify-center items-center absolute
        fadeInHalfSecondCards rounded-s-lg flex-grow w-full transition-all duration-100 
        ease-in cursor-not-allowed text-2xl hidden group-hover:flex z-50">
          <p className="text-center bg-gray-600 text-white shadow-lg p-3 rounded-lg">
            Added to cart
          </p>
        </div>
      )}

      <div
        className={`h-[83%] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-400 xl:aspect-h-8 xl:aspect-w-7`}>
        <img
          src={assetManager[item.categoryType]?.[item.imageIdentifier] || assetManager.NO_IMAGE}
          className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-200 ease-linear"
        />
      </div>
      <div className="flex gap-[20px] h-[18%] p-4 transition-all duration-200 ease-linear relative">
        <div className="absolute right-[10px] -top-[55px]">
          <Stars count={item.stars} />
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold text-xl">{item.name}</p>
          <StockRemaining count={item.quantity} />
        </div>

        <div className="flex">
          <p className="text-3xl font-bold text-center my-auto">${item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
