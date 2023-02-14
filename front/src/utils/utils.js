import axios from 'axios';
import api from '../api/api';

export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/i;

  return emailRegex.test(email);
};

export const refreshToken = async () => {
  try {
    console.log('토큰 갱신');
    const res = await axios.post(api.user.refresh(), {
      withCredentials: true,
    });
    console.log('새로운 토큰', res.data.data.accessToken);
    const accessToken = res.data.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['Authorization'] = accessToken;
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};
