import Scrollbars from 'react-custom-scrollbars-2';
import { useProductsGlobalValue } from '../../../../store/StateProvider';
import CardListCheckout from '../../Categories/Card/CardListCheckout';
import { ACTION_TYPES } from '../../../../utils/constants';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import classes from './SideModalCart.module.css';
import useSubmitOrder from '../../../../hooks/useSubmitOrder';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../../Spinner/Spinner';
import { GET_ALL_PRODUCTS } from '../../../../hooks/useGetAllProducts';

const SideModalCart = ({ setShowSideModal }) => {
  const [{ basket }, dispatch] = useProductsGlobalValue();
  const queryClient = useQueryClient();

  const { submitOrder, isSubmitOrderLoading } = useSubmitOrder({
    onSuccess: () => {
      toast.success('Order submitted successfully');
      setShowSideModal(false);
      dispatch({
        type: ACTION_TYPES.EMPTY_BASKET
      });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_PRODUCTS] });
    },
    onError: () => {
      toast.error('Something went wrong...');
    }
  });

  const handleSubmitOrder = () => {
    const payload = basket.map((item) => ({
      id: item.id,
      purchaseQuantity: item.purchaseQuantity
    }));

    submitOrder(payload);
  };

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.purchaseQuantity * item.price + amount, 0);

  const handleDeleteProductFromCart = (item) => {
    dispatch({
      type: ACTION_TYPES.REMOVER_FROM_BASKET,
      item
    });
  };

  const handleAddQuantity = (item) => {
    dispatch({
      type: ACTION_TYPES.ADD_QUANTITY,
      item
    });
  };

  const handleRemoveQuantity = (item) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_QUANTITY,
      item
    });
  };

  const renderProductList = () => (
    <div className="grid grid-rows-1 gap-[25px] px-6 py-4">
      {basket?.map((item) => (
        <CardListCheckout
          key={item.id}
          item={item}
          onDelete={handleDeleteProductFromCart}
          onAddQuantity={handleAddQuantity}
          onRemoveQuantity={handleRemoveQuantity}
        />
      ))}
    </div>
  );

  const renderBasketCheckout = () => (
    <div className="bg-gray-900 h-full flex flex-col">
      <div className="bg-gray-200 h-[6px]"></div>
      <div className="flex flex-grow items-center px-4">
        <p className="text-white font-semibold text-2xl">Total Price - ${getBasketTotal(basket)}</p>
      </div>
      <button
        className="mx-4 bg-indigo-500 hover:bg-indigo-600 transition-all duration-100 ease-in text-white font-semibold text-xl px-6 py-4 rounded-md mb-3"
        onClick={handleSubmitOrder}>
        Confirm Order
      </button>
    </div>
  );

  if (isSubmitOrderLoading)
    return (
      <div className="bg-gray-900 h-full pl-1 pt-1 pb-2">
        <div className="bg-gray-300 h-full rounded-lg overflow-hidden">
          <Spinner center />
        </div>
      </div>
    );

  return (
    <div className="bg-gray-900 h-full pl-1 pt-1 pb-2">
      <div className="bg-gray-700 h-full rounded-lg overflow-hidden">
        {basket?.length ? (
          <div className="h-full flex flex-col">
            <div className="h-[85%]">
              <Scrollbars className={classes.scrollbars}>
                <div>{renderProductList()}</div>
              </Scrollbars>
            </div>
            <div className="flex-grow">{renderBasketCheckout()}</div>
          </div>
        ) : (
          <div className="flex items-center w-full h-full">
            <div className="flex flex-col  w-full bg-gray-500 rounded-lg items-center justify-center py-[120px] my-auto">
              <ProductionQuantityLimitsIcon
                sx={{ width: '150px', height: '100px', color: 'white' }}
              />
              <p className="text-3xl text-white">You have no items in cart</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideModalCart;
