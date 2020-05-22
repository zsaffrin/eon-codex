import React from 'react';
import {
  arrayOf, func, shape, string,
} from 'prop-types';
import styled from 'styled-components';

const Multiselect = ({
  choices, id: fieldId, value, onChange,
}) => {
  const handleUpdate = (id) => {
    let newValue = { ...value };
    if (value[id]) {
      const { [id]: omit, ...rest } = value;
      newValue = rest;
    } else {
      newValue = { ...value, [id]: true };
    }

    onChange({
      id: fieldId,
      value: newValue,
    });
  };

  const StyledList = styled.ul(({ theme }) => {
    const { space } = theme;
    return `
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-gap: ${space.sm};
      grid-template-columns: 1fr 1fr;
    `;
  });
  const StyledChoice = styled.li(({ selected, theme }) => {
    const { color, space } = theme;
    return `
      background: ${selected ? color.primary : 'inherit'};
      border: 1px solid ${color.accent};
      border-radius: 4px;
      color: ${selected ? color.background : 'inherit'};
      font-size: 0.85em;
      padding: ${space.thin} ${space.sm};
    `;
  });

  return (
    <StyledList>
      {choices.map(({ id, label }) => (
        <StyledChoice
          key={id}
          selected={value[id] ? 1 : 0}
          onClick={() => handleUpdate(id)}
        >
          <div>{label}</div>
        </StyledChoice>
      ))}
    </StyledList>
  );
};

Multiselect.propTypes = {
  choices: arrayOf(shape({
    id: string,
    label: string,
  })),
  id: string,
  value: shape({}),
  onChange: func,
};
Multiselect.defaultProps = {
  choices: [],
  id: null,
  value: {},
  onChange: null,
};

export default Multiselect;
