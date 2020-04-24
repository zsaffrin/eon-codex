import React from 'react';
import { arrayOf, oneOfType, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ name, ...props }) => <FontAwesomeIcon icon={name} {...props} />;
Icon.propTypes = {
  name: oneOfType([arrayOf(string), string]),
};
Icon.defaultProps = {
  name: null,
};

export default Icon;
