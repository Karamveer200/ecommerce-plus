const Divider = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full bg-gray-800 h-[4px] mx-auto rounded-xl" />
      </div>
    </div>
  );
};

export default Divider;
