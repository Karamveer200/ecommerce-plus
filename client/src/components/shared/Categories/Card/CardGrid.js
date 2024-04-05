import Stars from './Stars/Stars';
import StockRemaining from './StockRemaining/StockRemaining';

const CardGrid = ({ item }) => {
  return (
    <div className="h-[500px] bg-gray-200 group rounded-lg hover:bg-gray-800 transition-all duration-200 ease-linear cursor-pointer shadow-lg">
      <div className="h-[83%] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-400 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item}
          className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all duration-200 ease-linear"
        />
      </div>
      <div className="flex gap-[20px] h-[18%] p-4 group-hover:text-white transition-all duration-200 ease-linear relative">
        <div className="absolute right-[10px] -top-[55px]">
          <Stars count={4} />
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold text-xl">I am name</p>
          <StockRemaining count={6} />
        </div>

        <div className="flex">
          <p className="text-3xl font-bold text-center my-auto">$20</p>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;