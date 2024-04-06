import { FolderOpenIcon } from '@heroicons/react/24/solid';

const NoDataFound = () => {
  return (
    <div className="mx-[135px] h-[400px] flex flex-col gap-[20px] justify-center border-2 border-gray-900 bg-gray-200 rounded-md items-center">
      <FolderOpenIcon width={150} />
      <p className="text-3xl font-semibold">NoDataFound</p>
    </div>
  );
};

export default NoDataFound;
