import { useMutation } from '@tanstack/react-query';
import { postConfirmOrder } from '../config/services/products';

const useSubmitOrder = ({ onSuccess, onError }) => {
  const { mutate: submitOrder, isPending: isSubmitOrderLoading } = useMutation({
    mutationFn: async (payload) => postConfirmOrder(payload),
    onSuccess,
    onError
  });
  return {
    submitOrder,
    isSubmitOrderLoading
  };
};

export default useSubmitOrder;
