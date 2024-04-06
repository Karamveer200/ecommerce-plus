import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="text-xs sm:text-lg toastStyles"
    />
  );
};

export default ToastWrapper;
