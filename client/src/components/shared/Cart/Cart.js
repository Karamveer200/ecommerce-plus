import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useProductsGlobalValue } from '../../../store/StateProvider';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideModalCart from './SideModalCart/SideModalCart';
import { useState } from 'react';

const Cart = () => {
  const [showSideModal, setShowSideModal] = useState(false);

  const [{ basket }] = useProductsGlobalValue();

  return (
    <div className="w-[85px] h-[85px] bg-gray-800 hover:bg-gray-600 transition-all duration-150 ease-in cursor-pointer rounded-full fixed bottom-4 right-4 z-50">
      <div
        className="w-full h-full flex items-center justify-center relative"
        onClick={() => setShowSideModal(true)}>
        {!!basket?.length && (
          <p className="absolute bg-blue-500 rounded-full p-2 text-white -top-[10px] -right-[10px] text-2xl font-semibold w-[38px] h-[38px] flex justify-center items-center">
            {basket.length}
          </p>
        )}
        <ShoppingBagIcon className="text-white w-[50px] -mt-[5px]" />
      </div>

      <SideDrawer isSideModalOpen={showSideModal} onClose={() => setShowSideModal(false)}>
        <SideModalCart />
      </SideDrawer>
    </div>
  );
};

export default Cart;
