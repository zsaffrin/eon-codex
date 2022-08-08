import styled from 'styled-components';

const StyledInput = styled.input(({ theme }) => {
  const { inputs } = theme;
  
  return `
    background: ${inputs.background};
    border: ${inputs.border};
    border-radius: ${inputs.borderRadius};
    padding: ${inputs.padding};
    font-size: ${inputs.fontSize};
    width: 100%;

    &:focus {
      outline: 0;
      background: ${inputs.focusBackground};
    }
  `;
});

const NumberInput = ({ id, value, onChange }) => {
  return (
    <StyledInput
      type="number"
      id={id}
      value={value}
      onChange={(e) => onChange({
        id,
        value: Number(e.target.value),
      })}
    />
  );
};

export default NumberInput;
