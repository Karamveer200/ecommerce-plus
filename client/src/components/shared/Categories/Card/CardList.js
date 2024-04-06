import Stars from './Stars/Stars';
import StockRemaining from './StockRemaining/StockRemaining';
import { TrashIcon } from '@heroicons/react/24/solid';
import CustomTooltip from '../../Tooltip/ToolTip';
import { assetManager } from '../../../../assets/assetManager';

const CardList = ({ item, onClick, onDelete, basket = [] }) => {
  const isItemInBasket = basket.find((product) => product.id === item.id);

  return (
    <div className={`h-[60px] w-full bg-gray-200 relative flex rounded-lg fadeInHalfSecondCards`}>
      <div
        className={`transition-all duration-200 group ease-linear hover:bg-gray-400 cursor-pointer flex border-2 border-gray-700 ${
          isItemInBasket
            ? 'bg-green-300 hover:bg-green-300 w-[93%] relative rounded-s-lg'
            : 'rounded-lg w-full'
        }`}
        onClick={() => onClick(item, isItemInBasket)}>
        <div className="border-2 border-gray-800 aspect-h-1 aspect-w-1 w-[100px] flex justify-center items-center overflow-hidden rounded-md bg-gray-400 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={assetManager[item.categoryType]?.[item.imageIdentifier] || assetManager.NO_IMAGE}
            className="h-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-200 ease-linear"
          />
        </div>
        <div className="flex gap-[20px] w-full py-4 px-10  transition-all duration-200 ease-linear items-center">
          <div className="flex flex-grow h-full items-center gap-[10px]">
            <p className="font-semibold text-lg xl:text-xl">{item.name}</p>
            <p className="text-3xl">|</p>
            <StockRemaining count={item.quantity} />
          </div>

          <div className="flex items-center gap-[25px]">
            <div className="right-[10px] -top-[60px]">
              <Stars count={item.stars} />
            </div>
            <p className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-right my-auto w-[100px] 2xl:w-[120px]">
              ${item.price}
            </p>
          </div>
        </div>
        {isItemInBasket && (
          <div
            className="h-full justify-center items-center absolute
        fadeInHalfSecondCards rounded-s-lg flex-grow w-full transition-all duration-100 
        ease-in cursor-not-allowed text-2xl hidden group-hover:flex">
            <p className="w-[500px] text-center bg-gray-400 p-3 rounded-lg">Added to cart</p>
          </div>
        )}
      </div>
      {isItemInBasket && (
        <div
          className="bg-gray-900 h-full justify-center items-center absolute right-0 
        fadeInHalfSecondCards rounded-e-lg flex flex-grow w-[7%] transition-all duration-200 
        ease-linear cursor-pointer hover:bg-gray-500"
          onClick={() => onDelete(item)}>
          <CustomTooltip title="Remove from cart">
            <TrashIcon className="text-red-500 w-[40px]" />
          </CustomTooltip>
        </div>
      )}
    </div>
  );
};

export default CardList;
