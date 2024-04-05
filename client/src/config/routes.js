import { lazy } from 'react';

const Home = lazy(() => import('../components/Home/Home'));

export const ALL_ROUTES_PATHS = {
  HOME: '/'
};

export const ALL_ROUTES = [
  {
    pathName: ALL_ROUTES_PATHS.HOME,
    Component: Home,
    heading: 'Landing'
  }
];
