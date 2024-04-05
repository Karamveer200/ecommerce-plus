import Stars from './Stars/Stars';
import StockRemaining from './StockRemaining/StockRemaining';

const CardList = ({ item }) => {
  return (
    <div className="h-[90px] w-full bg-gray-200 group rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg ease-linear cursor-pointer flex border-2 border-gray-700">
      <div className="aspect-h-1 aspect-w-1 w-[100px] flex justify-center items-center overflow-hidden rounded-md bg-gray-400 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item}
          className="h-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-200 ease-linear"
        />
      </div>
      <div className="flex gap-[20px] w-full py-4 px-10 group-hover:text-white transition-all duration-200 ease-linear">
        <div className="flex flex-grow h-full items-center gap-[10px]">
          <p className="font-semibold text-2xl">I am name</p>
          <p className="text-4xl">|</p>
          <StockRemaining count={6} />
        </div>

        <div className="flex items-center gap-[25px]">
          <div className="right-[10px] -top-[60px]">
            <Stars count={4} />
          </div>
          <p className="text-4xl font-bold text-center my-auto">$20</p>
        </div>
      </div>
    </div>
  );
};

export default CardList;
