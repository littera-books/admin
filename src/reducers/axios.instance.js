import axios from 'axios';
import dataConfig from '../dataConfig';

export const axiosNoAuth = axios.create({
  baseURL: dataConfig.baseUrl,
  timeout: 1000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

const axiosAuth = () => {
  const token = sessionStorage.getItem('adminToken');
  return axios.create({
    baseURL: dataConfig.baseUrl,
    timeout: 1000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosAuth;
