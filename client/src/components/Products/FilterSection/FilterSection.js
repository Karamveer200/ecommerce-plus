import TabsButton from '../../shared/Button/TabsButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { PRODUCTS_TABS_TYPE } from '../Products';
import { useProductsGlobalValue } from '../../../store/StateProvider';

const FilterSection = ({ layoutTab, setLayoutTab, setFilteredProducts }) => {
  const [{ allProducts }] = useProductsGlobalValue();

  const [searchInput, setSearchInput] = useState('');

  const tabs = [
    { label: <p>Grid</p>, onClick: () => setLayoutTab(PRODUCTS_TABS_TYPE.GRID) },
    { label: <p>List</p>, onClick: () => setLayoutTab(PRODUCTS_TABS_TYPE.LIST) }
  ];

  const handleSearchBarChange = (e) => {
    const text = e.target.value;
    setSearchInput(text);

    const prefixLowerCase = text.toLowerCase();

    const filteredItems = allProducts?.filter((product) => {
      return (
        product.name.toLowerCase().startsWith(prefixLowerCase) ||
        product.categoryTitle.toLowerCase().startsWith(prefixLowerCase) ||
        product.price.toString().startsWith(prefixLowerCase)
      );
    });

    console.log('filteredItems', filteredItems);
    setFilteredProducts(filteredItems);
  };

  const renderSearchBar = () => (
    <div className="flex items-center border-2 rounded-full md:shadow-md border-gray-100 bg-gray-800 w-[40%] xl:w-[500px]">
      <input
        type="text"
        placeholder="Search here"
        value={searchInput}
        autoComplete="off"
        onChange={handleSearchBarChange}
        className="pl-5 h-8 text-lg w-full focus:text-gray-600 font-semibold focus:bg-white text-white rounded-full ml-[4px] outline-none flex-grow mr-2 pr-2 bg-transparent"
      />
      <MagnifyingGlassIcon className="hidden lg:inline-flex h-10 bg-blue-500 hover:bg-blue-400 text-white rounded-full p-2 cursor-pointer" />
    </div>
  );

  return (
    <div className="pt-[50px] px-[70px] flex w-full relative">
      {renderSearchBar()}
      <TabsButton tabs={tabs} value={layoutTab} className="absolute -bottom-[6px] right-[70px]" />
    </div>
  );
};

export default FilterSection;
