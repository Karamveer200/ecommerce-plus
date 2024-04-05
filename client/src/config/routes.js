import { lazy } from 'react';

const Home = lazy(() => import('../components/Home/Home'));
const Products = lazy(() => import('../components/Products/Products'));

export const ALL_ROUTES_PATHS = {
  HOME: '/',
  PRODUCTS: '/products'
};

export const ALL_ROUTES = [
  {
    pathName: ALL_ROUTES_PATHS.HOME,
    Component: Home
  },
  {
    pathName: ALL_ROUTES_PATHS.PRODUCTS,
    Component: Products
  }
];
