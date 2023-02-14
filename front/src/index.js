import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { iconStyle, GlobalStyle } from './styles/globalStyle';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { resetTokenAndReattemptRequest } from './utils/utils';

// axios.defaults.baseURL = 'https://i8a809.p.ssafy.io/api';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== 'null') {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response);
    const { response: errorResponse } = error;
    const originalRequest = error.config;
    // 토큰 갱신
    if (errorResponse.data.error === 'EXPIRED_TOKEN') {
      // return await refreshToken(error);
      return await resetTokenAndReattemptRequest(error);
    } else {
      // 로그아웃
      console.log('로그아웃 하러 들어옴');
      // return await dispatchLogout(error);
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <IconContext.Provider
          value={{
            style: iconStyle,
          }}
        >
          <App />
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
