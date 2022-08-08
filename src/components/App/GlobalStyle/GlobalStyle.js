import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle(({ theme }) => {
  const { app, text } = theme;
  return `
    html { box-sizing: border-box; }
    *, *:before, *:after { box-sizing: inherit; }

    body {
      background: ${app.background};
      color: ${text.color};
      font-size: 14px;
    }

    p {
      line-height: 1.4;
      margin: 0 0 1em;
      max-width: 48rem;
    }
  `;
});

export default GlobalStyle;
