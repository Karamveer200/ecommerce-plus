import Card from './Card/Card';

const Categories = ({ label, products = [] }) => {
  return (
    <div className="flex flex-col gap-[20px] w-full px-[70px]">
      <p className="text-gray-800 font-bold text-4xl">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-[25px] md:gap-[35px] 2xl:gap-[40px]">
        {products.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
