import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle(({ theme }) => {
  const { app } = theme;
  return `
    html { box-sizing: border-box; }
    *, *:before, *:after { box-sizing: inherit; }

    body {
      background: ${app.background};
      color: ${app.color};
      font-size: 14px;
    }

    p {
      line-height: 1.4;
      margin: 0 0 1em;
    }
  `;
});

export default GlobalStyle;
