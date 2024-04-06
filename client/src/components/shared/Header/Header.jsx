import { UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

import logo from '../../../assets/logo.webp';
import { Link, useLocation } from 'react-router-dom';
import { ALL_ROUTES_PATHS } from '../../../config/routes';
import { useProductsGlobalValue } from '../../../store/StateProvider';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const Header = () => {
  const { pathname } = useLocation();

  const { userData, loginWithRedirect, logout } = useContext(UserContext);

  const handleAuthBtnClick = () =>
    userData
      ? logout({ logoutParams: { returnTo: process.env.REACT_APP_REDIRECT_URI } })
      : loginWithRedirect();

  return (
    <header
      className={`fixed w-full top-0 z-50 grid grid-cols-2 items-center backdrop-blur-lg shadow-md py-3 px-2 md:px-10 border-b-2 border-b-slate-100 ${
        pathname === ALL_ROUTES_PATHS.HOME ? 'bg-transparent' : 'bg-indigo-700'
      }`}>
      <Link
        to={ALL_ROUTES_PATHS.HOME}
        className="relative flex h-10 cursor-pointer items-center gap-[20px]">
        <img src={logo} alt="Logo" className="w-[55px] h-[55px] rounded-full" />
        <p
          className={`font-extrabold text-3xl ${
            pathname === ALL_ROUTES_PATHS.HOME ? 'text-blue-500' : 'text-white'
          } `}>
          Valmart
        </p>
      </Link>

      <div className="flex space-x-4 items-center justify-end text-gray-600 font-inter">
        <button
          className="hidden md:flex space-x-4 items-center bg-blue-500 hover:bg-blue-400 group transition-all duration-150 ease-in px-4 py-1 rounded-full border-2 border-gray-600"
          onClick={handleAuthBtnClick}>
          <p className=" md:text-xs lg:text-lg text-white font-semibold pl-[10px] group-hover:text-gray-900">
            {userData ? `${userData.name}, Logout` : 'Login / Signup'}
          </p>

          {userData ? (
            <UserCircleIcon className="h-10 text-white group-hover:text-gray-900" />
          ) : (
            <ShieldCheckIcon className="h-[40px] text-white group-hover:text-gray-900" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
