import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// react icons 스타일
const iconStyle = {
  verticalAlign: 'middle',
  color: 'var(--icon-color)',
  fontSize: '1.5rem',
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    font-weight: 400;
    font-style: normal;
  }
  
  :root {
    /* Color */
    --main-color: #A9D7D0;
    --light-color: #DDF1EE;
    --gray-color: #F8FAF9;
    --dark-color: #455A53;
    --icon-color: #667080;
    --gray800-color: #464646;
    --gray700-color: #D9D9D9;
    --light-pink-color: #FDE3E3;
    --pink-color: #FC9595;
    --red-color: #D61616;
    --default-font-color: #2D2D2D;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    color: var(--default-font-color);
    width: 100%;
    height: 100%;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  input {
    border: none;
    background-color: inherit;
  }

  input:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export { iconStyle, GlobalStyle };
