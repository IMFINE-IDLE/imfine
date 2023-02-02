import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://i8A809.p.ssafy.io:8080',
  headers: { 'X-AUTH-TOKEN': localStorage.getItem('accessToken') },
});

instance.defaults.headers.common['X-AUTH-TOKEN'] =
  localStorage.getItem('accessToken');

export default instance;
