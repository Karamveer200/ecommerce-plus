import { StarIcon } from '@heroicons/react/24/solid';

const Stars = ({ count = 0 }) => {
  const totalStarsArr = [0, 1, 2, 3, 4];

  return (
    <div className="flex gap-[5px] items-center bg-gray-800 rounded-md p-2">
      {totalStarsArr.map((star, index) => (
        <StarIcon
          key={index}
          className={`h-7  ${index < count ? 'text-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
};

export default Stars;
