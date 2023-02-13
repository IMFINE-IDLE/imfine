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

// // axios.defaults.baseURL = 'https://i8a809.p.ssafy.io/api';
axios.defaults.withCredentials = true;
const accessToken = localStorage.getItem('accessToken');
console.log(accessToken);
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken;
}

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
