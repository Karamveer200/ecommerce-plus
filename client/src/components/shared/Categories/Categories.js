import CardGrid from './Card/CardGrid';
import CardList from './Card/CardList';

const Categories = ({ label, products = [], isGridView = true }) => {
  const renderGrid = () => (
    <>
      <p className="text-gray-800 font-bold text-4xl">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-[25px] md:gap-[35px] 2xl:gap-[40px]">
        {products.map((item, index) => (
          <CardGrid key={index} item={item} />
        ))}
      </div>
    </>
  );

  const renderList = () => (
    <>
      <p className="text-gray-800 font-bold text-3xl">{label}</p>
      <div className="grid grid-rows-1 gap-[15px] 2xl:gap-[20px]">
        {products.map((item, index) => (
          <CardList key={index} item={item} />
        ))}
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-[20px] w-full px-[70px]">
      {isGridView ? renderGrid() : renderList()}
    </div>
  );
};

export default Categories;
