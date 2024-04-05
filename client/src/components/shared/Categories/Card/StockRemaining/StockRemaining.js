const StockRemaining = ({ count = 0 }) => {
  const renderCount = (label, countClassName) => (
    <>
      <p>{label}</p>
      <p>-</p>
      <p
        className={`w-8 h-8 flex font-semibold justify-center items-center rounded-full text-white ${countClassName}`}>
        {count}
      </p>
    </>
  );

  const renderBody = () => {
    switch (true) {
      case count > 5:
        return renderCount('In Stock', 'bg-green-500 ');
      case count > 0:
        return renderCount('Low Stock', 'bg-orange-500 ');
      default:
        return renderCount('Out of Stock', 'bg-red-500');
    }
  };

  return <div className="flex gap-[5px] text-xl items-center">{renderBody()}</div>;
};

export default StockRemaining;
