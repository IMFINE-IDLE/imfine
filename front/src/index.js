import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { iconStyle, GlobalStyle } from './styles/globalStyle';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <IconContext.Provider
        value={{
          style: iconStyle,
        }}
      >
        <App />
      </IconContext.Provider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
