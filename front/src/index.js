import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { iconStyle, GlobalStyle } from './styles/globalStyle';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import axios from 'axios';
import { onSilentRefresh } from './store/slice/userSlice';
import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.withCredentials = true;
onSilentRefresh();

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
