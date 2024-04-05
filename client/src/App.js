import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import FallbackLoader from './components/shared/FallbackLoader/FallbackLoader';
import Header from './components/shared/Header/Header';
import api from './config/services/api';
import { scrollToTop } from './utils/helperFunctions';
import ToastWrapper from './components/shared/ToastWrapper/ToastWrapper';
import { ALL_ROUTES } from './config/routes';
import { API_HEADER_KEYS } from './utils/constants';

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = {};

  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  const deleteAccessToken = () => {
    delete api.defaults.headers.common[API_HEADER_KEYS.AUTHORIZATION];

    localStorage.removeItem(API_HEADER_KEYS.ACCESS_TOKEN);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem(API_HEADER_KEYS.ACCESS_TOKEN, token);
        api.defaults.headers.common = { [API_HEADER_KEYS.AUTHORIZATION]: `bearer ${token}` };
      } catch (error) {
        deleteAccessToken();
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    } else {
      deleteAccessToken();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] bg-tama_yellow flex flex-col">
        <FallbackLoader />
      </div>
    );
  }

  return (
    <div>
      <ToastWrapper />
      <Header />

      <div className={`w-full`} style={{ height: '100vh' }}>
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            {ALL_ROUTES.map((item, index) => (
              <Route path={item.pathName} element={<item.Component />} key={index} />
            ))}

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
