import api from './api';

const BASE_PATH = '/categories';

export const getAllCategories = () => {
  return api.get(`${BASE_PATH}/all`).then((res) => res.data);
};
