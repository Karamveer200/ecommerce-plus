import TabsButton from '../../shared/Button/TabsButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { PRODUCTS_TABS_TYPE } from '../Products';
import { useProductsGlobalValue } from '../../../store/StateProvider';
import Select from 'react-select';
import { ACTION_TYPES } from '../../../utils/constants';

const sortingOptions = [
  { value: 0, key: 'name', label: 'Name / Ascending', isAscending: true },
  { value: 1, key: 'name', label: 'Name / Descending', isAscending: false },
  { value: 2, key: 'price', label: 'Price / Ascending', isAscending: true },
  { value: 3, key: 'price', label: 'Price / Descending', isAscending: false },
  { value: 4, key: 'stars', label: 'Stars / Ascending', isAscending: true },
  { value: 5, key: 'stars', label: 'Stars / Descending', isAscending: false }
];

const FilterSection = ({ layoutTab, setLayoutTab, setFilteredProducts }) => {
  const [{ allProducts }, dispatch] = useProductsGlobalValue();

  const [searchInput, setSearchInput] = useState('');
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);

  useEffect(() => {
    if (sortOrder) {
      const sortedData = sortObjects(allProducts, sortOrder.key, sortOrder.isAscending) || [];

      dispatch({
        type: ACTION_TYPES.SET_ALL_PRODUCTS,
        products: sortedData
      });
    }
  }, [sortOrder]);

  function sortObjects(array, sortCriteria, isAscending) {
    return array?.slice().sort((a, b) => {
      let val1 = a[sortCriteria];
      let val2 = b[sortCriteria];

      if (!isAscending) {
        val1 = val2;
        val2 = a[sortCriteria];
      }

      return typeof val1 === 'string' ? val1?.localeCompare(val2) : val1 - val2;
    });
  }

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
    <div className="pt-[50px] px-[70px] flex w-full relative justify-between items-center">
      {renderSearchBar()}
      <div className="flex-grow flex justify-end gap-[40px]">
        <div className="flex items-center gap-[15px] bg-gray-800 p-2 rounded-md">
          <p className="text-xl text-white font-semibold pl-[10px]">Sort By - </p>
          <Select
            options={sortingOptions}
            placeholder="Sort By"
            isClearable={false}
            value={sortOrder}
            onChange={(e) => setSortOrder(e)}
            className="w-[250px]"
          />
        </div>
        <TabsButton tabs={tabs} value={layoutTab} />
      </div>
    </div>
  );
};

export default FilterSection;
