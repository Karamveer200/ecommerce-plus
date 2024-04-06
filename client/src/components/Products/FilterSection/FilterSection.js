import TabsButton from '../../shared/Button/TabsButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { PRODUCTS_TABS_TYPE, SORTING_OPTIONS, CATEGORY_DEFAULT_OPTIONS } from '../Products';
import Select from 'react-select';

const FilterSection = ({ filters, setFilters, layoutTab, setLayoutTab, allCategories = [] }) => {
  const getCategoryOptions = () => {
    const options =
      allCategories.map((category) => ({
        label: category.title,
        value: category.type
      })) || [];

    return [CATEGORY_DEFAULT_OPTIONS, ...options];
  };

  const tabs = [
    { label: <p>Grid</p>, onClick: () => setLayoutTab(PRODUCTS_TABS_TYPE.GRID) },
    { label: <p>List</p>, onClick: () => setLayoutTab(PRODUCTS_TABS_TYPE.LIST) }
  ];

  const handleSearchBarChange = (e) => {
    const text = e.target.value;
    setFilters((prev) => ({ ...prev, searchInput: text }));
  };

  const handleSelectFilterChange = (key, e) => {
    setFilters((prev) => ({ ...prev, [key]: e }));
  };

  const renderSearchBar = () => (
    <div className="flex items-center border-2 rounded-full md:shadow-md border-gray-100 bg-gray-800 w-[40%] xl:w-[500px]">
      <input
        type="text"
        placeholder="Search here"
        value={filters.searchInput}
        autoComplete="off"
        onChange={handleSearchBarChange}
        className="pl-5 h-8 text-lg w-full focus:text-gray-600 font-semibold focus:bg-white text-white rounded-full ml-[4px] outline-none flex-grow mr-2 pr-2 bg-transparent"
      />
      <MagnifyingGlassIcon className="hidden lg:inline-flex h-10 bg-blue-500 hover:bg-blue-400 text-white rounded-full p-2 cursor-pointer" />
    </div>
  );

  const renderSelectFilters = () => (
    <div className="flex items-center gap-[15px] bg-gray-800 p-2 rounded-md">
      <p className="text-xl text-white font-semibold pl-[10px]">Sort By - </p>
      <Select
        options={SORTING_OPTIONS}
        value={filters.sortType}
        onChange={(e) => handleSelectFilterChange('sortType', e)}
        className="w-[250px] font-semibold"
      />

      <Select
        options={getCategoryOptions()}
        value={filters.categoryFilter}
        onChange={(e) => handleSelectFilterChange('categoryFilter', e)}
        className="w-[250px]"
        placeholder="Select Category"
      />
    </div>
  );

  return (
    <div className="pt-[50px] px-[135px] flex w-full relative justify-between items-center">
      {renderSearchBar()}
      <div className="flex-grow flex justify-end gap-[40px]">
        {renderSelectFilters()}
        <TabsButton tabs={tabs} value={layoutTab} />
      </div>
    </div>
  );
};

export default FilterSection;
