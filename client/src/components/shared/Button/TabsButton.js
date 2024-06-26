const TabsButton = ({ tabs = [], value, className }) => {
  return (
    <div
      className={`flex space-x-4 bg-gray-800 px-2 py-[9px] rounded-md ${className}`}
      aria-label="Tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${
            value === index ? 'bg-indigo-500' : 'hover:bg-indigo-200 hover:text-black'
          } w-[120px] h-[36px] rounded-md font-semibold text-white transition-all duration-150 ease-linear text-lg`}
          onClick={tab.onClick}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsButton;
