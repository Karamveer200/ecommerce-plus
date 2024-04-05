import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import FallbackLoader from './components/shared/FallbackLoader/FallbackLoader';
import Header from './components/shared/Header/Header';

import { scrollToTop } from './utils/helperFunctions';
import ToastWrapper from './components/shared/ToastWrapper/ToastWrapper';
import { ALL_ROUTES } from './config/routes';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

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
}

export default App;
