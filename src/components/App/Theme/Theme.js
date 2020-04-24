import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { ravien } from '../../../themes';

const Theme = ({ children }) => (
  <ThemeProvider theme={ravien}>
    {children}
  </ThemeProvider>
);
Theme.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};
Theme.defaultProps = {
  children: [],
};

export default Theme;
