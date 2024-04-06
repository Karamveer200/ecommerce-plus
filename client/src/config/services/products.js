import api from './api';

const BASE_PATH = '/products';

export const getAllProducts = ({ signal, params }) => {
  return api.get(`${BASE_PATH}/all`, { signal, params }).then((res) => res.data);
};

export const postConfirmOrder = (body) => {
  return api.post(`${BASE_PATH}/confirmOrder`, body).then((res) => res.data);
};
