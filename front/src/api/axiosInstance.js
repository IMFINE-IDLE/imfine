import axios from 'axios';

const URL = 'http://i8A809.p.ssafy.io/api';

const authAPI = (url, options) => {
  return axios.create({
    baseURL: url,
    ...options,
  });
};

export const axiosInstance = authAPI(URL);
