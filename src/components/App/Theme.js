import { useState } from 'react';

import { ThemeProvider } from 'styled-components';

import { themeDefaultDark } from '../../themes';

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(themeDefaultDark);
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;