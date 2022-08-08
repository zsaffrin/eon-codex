import styled from 'styled-components';

const StyledInput = styled.textarea(({ height, theme }) => {
  const { inputs } = theme;
  
  return `
    background: ${inputs.background};
    border: ${inputs.border};
    border-radius: ${inputs.borderRadius};
    min-height: ${height || '4rem'};
    padding: ${inputs.padding};
    font-size: ${inputs.fontSize};
    width: 100%;

    &:focus {
      outline: 0;
      background: ${inputs.focusBackground};
    }
  `;
});

const LongtextInput = ({ id, height, value, onChange }) => {
  return (
    <StyledInput
      id={id}
      value={value}
      onChange={(e) => onChange({
        id,
        value: e.target.value,
      })}
      height={height}
    />
  );
};

export default LongtextInput;
