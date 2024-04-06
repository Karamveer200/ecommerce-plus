import CardGrid from './Card/CardGrid';
import { useProductsGlobalValue } from '../../../store/StateProvider';
import CardList from './Card/CardList';
import { toast } from 'react-toastify';
import { ACTION_TYPES } from '../../../utils/constants';

const Categories = ({ label, products = [], isGridView = true }) => {
  const [{ basket }, dispatch] = useProductsGlobalValue();

  const handleAddProductToCart = (item, isItemInBasket) => {
    if (isItemInBasket) return;

    dispatch({
      type: ACTION_TYPES.ADD_TO_BASKET,
      item
    });

    toast.success(`${item.name} has been added to Cart`);
  };

  const handleDeleteProductFromCart = (item) => {
    dispatch({
      type: ACTION_TYPES.REMOVER_FROM_BASKET,
      item
    });
  };

  const renderGrid = () => (
    <>
      <p className="text-gray-800 font-bold text-4xl">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-[25px] md:gap-[35px] 2xl:gap-[40px]">
        {products.map((item) => (
          <CardGrid key={item.id} item={item} onClick={handleAddProductToCart} basket={basket} />
        ))}
      </div>
    </>
  );

  const renderList = () => (
    <>
      <p className="text-gray-800 font-bold text-3xl">{label}</p>
      <div className="grid grid-rows-1 gap-[15px] 2xl:gap-[20px]">
        {products.map((item) => (
          <CardList
            key={item.id}
            item={item}
            onClick={handleAddProductToCart}
            onDeleteClick={handleDeleteProductFromCart}
            basket={basket}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-[20px] w-full px-[140px]">
      {isGridView ? renderGrid() : renderList()}
    </div>
  );
};

export default Categories;
