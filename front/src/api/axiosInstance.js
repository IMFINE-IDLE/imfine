import axios from 'axios';

const URL = 'http://i8A809.p.ssafy.io/api';

const authAPI = (url, options) => {
  const accessToken = localStorage.getItem('accessToken');

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: accessToken,
    },
    ...options,
  });
};

export const axiosInstance = authAPI(URL);
