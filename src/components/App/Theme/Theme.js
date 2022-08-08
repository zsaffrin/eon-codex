import { useState } from 'react';
import merge from 'lodash/merge';
import { ThemeProvider } from 'styled-components';

import defaultTheme from './defaultTheme';
import { boroDark, boroLight } from '../../../themes';

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(boroDark);
  
  const switchTheme = (newTheme) => {
    if (newTheme === 'boroLight') {
      setTheme(boroLight);
    } else if (newTheme === 'boroDark') {
      setTheme(boroDark);
    }
  };

  const themeObjectToProvide = { 
    ...merge(defaultTheme, theme),
    setTheme: switchTheme,
  };

  return (
    <ThemeProvider theme={themeObjectToProvide}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;