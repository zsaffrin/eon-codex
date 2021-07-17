import { useState } from 'react';

import { ThemeProvider } from 'styled-components';

import { themeDefaultDark } from '../../themes';

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(themeDefaultDark);
  
  //TODO: Create theme switcher
  //Should be able to do include this as a method on the theme object
  //unless this messes with styled-components

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;