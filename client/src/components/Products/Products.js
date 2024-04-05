import { assetManager } from '../../assets/assetManager';
import Categories from '../shared/Categories/Categories';
import { useState } from 'react';
import TabsButton from '../shared/Button/TabsButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const TABS_TYPE = {
  GRID: 0,
  LIST: 1
};

const ProductsList = () => {
  const [searchInput, setSearchInput] = useState('');

  const [layoutTab, setLayoutTab] = useState(TABS_TYPE.LIST);

  const tabs = [
    { label: <p>Grid</p>, onClick: () => setLayoutTab(TABS_TYPE.GRID) },
    { label: <p>List</p>, onClick: () => setLayoutTab(TABS_TYPE.LIST) }
  ];

  const renderSearchBar = () => (
    <div className="flex items-center border-2 rounded-full md:shadow-md border-gray-100 bg-gray-800 w-[500px]">
      <input
        type="text"
        placeholder="Search here"
        value={searchInput}
        autoComplete="off"
        onChange={(e) => setSearchInput(e.target.value)}
        className="pl-5 h-8 text-lg w-full focus:text-gray-600 font-semibold focus:bg-white text-white rounded-full ml-[4px] outline-none flex-grow mr-2 pr-2 bg-transparent"
      />
      <MagnifyingGlassIcon className="hidden lg:inline-flex h-10 bg-blue-500 hover:bg-blue-400 text-white rounded-full p-2 cursor-pointer" />
    </div>
  );

  return (
    <div className="relative z-10 bg-gray-100 pb-[100px]">
      <div className="mt-[80px]">
        <div className="pt-[50px] px-[70px] flex w-full relative">
          {renderSearchBar()}
          <TabsButton
            tabs={tabs}
            value={layoutTab}
            className="absolute -bottom-[6px] right-[70px]"
          />
        </div>

        <div
          className={`pt-[40px] flex flex-col ${
            layoutTab === TABS_TYPE.GRID ? 'gap-[80px] md:gap-[120px]' : 'gap-[50px] md:gap-[70px]'
          }`}>
          <Categories
            label="Electronics"
            products={Object.values(assetManager.electronics)}
            isGridView={layoutTab === TABS_TYPE.GRID}
          />
          <Categories
            label="Clothing"
            products={Object.values(assetManager.clothing)}
            isGridView={layoutTab === TABS_TYPE.GRID}
          />
          <Categories
            label="Footwear"
            products={Object.values(assetManager.footWear)}
            isGridView={layoutTab === TABS_TYPE.GRID}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
