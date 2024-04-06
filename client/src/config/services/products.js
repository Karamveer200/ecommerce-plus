import api from './api';

const BASE_PATH = '/products';

export const getAllProducts = () => {
  return api.get(`${BASE_PATH}/all`).then((res) => res.data);
};
