import axios from 'axios';
import api from '../api/api';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];
/**
 * 토큰을 갱신하고 기존 요청을 처리
 */
export const resetTokenAndReattemptRequest = async (
  error,
  dispatchCallback
) => {
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
    console.log(err);
    // console.log('로그아웃 하러 들어옴');
    localStorage.setItem('accessToken', null);
    dispatchCallback();

    return Promise.reject(error);
  }
};

/**
 * 기존 요청들을 처리하기 위해 배열에 담기
 */
function addSubscriber(callback) {
  subscribers.push(callback);
}

/**
 * 기존 요청들 처리 및 배열 초기화
 */
function onAccessTokenFetched(accessToken) {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
}

/**
 * 이메일 유효성 검증 함수
 */
export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/i;

  return emailRegex.test(email);
};
