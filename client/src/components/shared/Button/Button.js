const Button = ({ children, ...props }) => {
  return (
    <button
      className="text-white bg-blue-500 md:px-10 md:py-4 px-4 py-2 shadow-lg rounded-lg hover:shadow-xl
  hover:scale-110 transition duration-300 hover:text-gray-900 hover:bg-blue-400 text-base sm:text-xl"
      {...props}>
      {children}
    </button>
  );
};

export default Button;
