import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://i8A809.p.ssafy.io:8080',
  // headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  // withCredentials: true,
});

// instance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

export default instance;
