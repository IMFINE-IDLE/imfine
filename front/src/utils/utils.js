import axios from 'axios';
import api from '../api/api';

export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/i;

  return emailRegex.test(email);
};

// axios 토큰 갱신
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export const resetTokenAndReattemptRequest = async (error) => {
  try {
    console.log('토큰 갱신');
    const { response: errorResponse } = error;
    const retryOriginalRequest = new Promise((resolve, reject) => {
      addSubscriber(async () => {
        try {
          errorResponse.config.headers['Authorization'] =
            localStorage.getItem('accessToken');
          resolve(axios(errorResponse.config));
        } catch (err) {
          reject(err);
        }
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const res = await axios.post(api.user.refresh(), {
        withCredentials: true,
      });
      const newToken = res.data.data.accessToken;
      // console.log('새로운 토큰', newToken);
      localStorage.setItem('accessToken', newToken);
      axios.defaults.headers.common['Authorization'] = newToken;
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newToken);
      return retryOriginalRequest;
    }
  } catch (err) {
    // logOut()
    console.log(err);
    return Promise.reject(error);
  }
};

function addSubscriber(callback) {
  subscribers.push(callback);
}

function onAccessTokenFetched(accessToken) {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
}

// function logOut() {
//   removeUserToken('access');
//   removeUserToken('refresh');
//   window.location.href = '/signin';
// }
