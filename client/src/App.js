import React, { useEffect,  Suspense } from 'react';
import { Navigate, Route, Routes,  } from 'react-router-dom';

const ALL_ROUTES = [];

function App() {
  return (
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
  );
}

export default App;
