import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle(() => {
  return `
    html { box-sizing: border-box; }
    *, *:before, *:after { box-sizing: inherit; }

    body {
      background: #ccc;
      color: #006;
    }

    p {
      line-height: 1.4;
      margin: 0 0 1em;
    }
  `;
});

export default GlobalStyle;
