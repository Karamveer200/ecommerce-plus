import { TrashIcon } from '@heroicons/react/24/solid';
import CustomTooltip from '../../Tooltip/ToolTip';
import { assetManager } from '../../../../assets/assetManager';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CardListCheckout = ({
  item,
  onDelete,
  onAddQuantity,
  onRemoveQuantity,
  outOfStockItems = []
}) => {
  const isQuantityReducible = item.purchaseQuantity > 1;
  const isMaxQuantityReached = item.purchaseQuantity === item.quantity;
  const itemPrice = item.purchaseQuantity * item.price;

  const isItemOutOfStock = outOfStockItems.find((product) => product.id === item.id);

  const renderQuantity = () => (
    <div className="bg-gray-200 h-full justify-center items-center absolute right-[10%] flex flex-grow w-[10%]">
      <div className="flex flex-col items-center gap-[10px] py-3">
        <CustomTooltip title={isQuantityReducible && 'Remove Item'} placement="top">
          <RemoveCircleOutlineIcon
            sx={{
              width: '30px',
              height: '30px',
              color: 'black',
              cursor: 'pointer',
              '&:hover': { color: 'grey' },
              ...(!isQuantityReducible && { cursor: 'not-allowed' })
            }}
            onClick={() => onRemoveQuantity(item)}
          />
        </CustomTooltip>

        <p className="text-2xl font-semibold">{item.purchaseQuantity}</p>

        <CustomTooltip title={isMaxQuantityReached ? 'Max quantity reached' : 'Add Item'}>
          <AddCircleOutlineIcon
            sx={{
              width: '30px',
              height: '30px',
              color: 'black',
              cursor: 'pointer',
              '&:hover': { color: 'grey' },
              ...(isMaxQuantityReached && { cursor: 'not-allowed' })
            }}
            onClick={() => onAddQuantity(item)}
          />
        </CustomTooltip>
      </div>
    </div>
  );

  return (
    <div
      className={`h-[120px] w-full bg-gray-800 relative flex rounded-lg fadeInHalfSecondCards border-white border-2 ${
        isItemOutOfStock && 'border-red-500 border-4'
      }`}>
      <div
        className={`transition-all duration-200 group ease-linear cursor-pointer flex border-2 border-gray-700 rounded-lg w-full
        }`}>
        <div className="aspect-h-1 aspect-w-1 w-[130px] flex justify-center items-center overflow-hidden rounded-md bg-gray-100 border-2 border-gray-800 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={assetManager[item.categoryType]?.[item.imageIdentifier] || assetManager.NO_IMAGE}
            className="h-full object-cover object-center transition-all duration-200 ease-linear"
          />
        </div>
        <div className="flex gap-[20px] w-full py-4 px-4  transition-all duration-200 ease-linear items-center text-white">
          <div className="flex flex-col flex-grow h-full justify-center gap-[18px]">
            <p className="font-semibold text-2xl">{item.name}</p>
            <p className="font-semibold text-lg">Price - ${itemPrice}</p>
          </div>
        </div>
      </div>

      {renderQuantity()}

      <div
        className="bg-gray-700 h-full justify-center items-center absolute right-0 
        fadeInHalfSecondCards rounded-e-lg flex flex-grow w-[10%] transition-all duration-200 
        ease-linear cursor-pointer hover:bg-gray-500"
        onClick={() => onDelete(item)}>
        <CustomTooltip title="Remove from cart">
          <TrashIcon className="text-red-500 w-[35px]" />
        </CustomTooltip>
      </div>

      {isItemOutOfStock && (
        <div className="w-[90%] h-full bg-red-800 p-2 absolute bg-opacity-90 flex items-center justify-center">
          <p className="text-white font-semibold text-xl">Item is out of stock</p>
        </div>
      )}
    </div>
  );
};

export default CardListCheckout;
