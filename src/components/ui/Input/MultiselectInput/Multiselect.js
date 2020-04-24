import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

const Multiselect = ({ choices }) => (
  <div>
    {choices.map(({ id, label }) => (
      <div key={id}>{label}</div>
    ))}
  </div>
);

Multiselect.propTypes = {
  choices: arrayOf(shape({
    id: string,
    label: string,
  })),
};
Multiselect.defaultProps = {
  choices: [],
};

export default Multiselect;
