import styled from 'styled-components';

const StyledInput = styled.input(({ theme }) => {
  const { input } = theme;
  return `
    background: ${input.inputBg};
    border: ${input.border};
    border-radius: 0.25em;
    padding: 0.5em;
    font-size: 0.9em;
    width: 100%;

    &:focus {
      outline: 0;
      background: ${input.inputActiveBg};
    }
  `;
});

const LongtextInput = ({ id, value, onChange }) => {
  return (
    <StyledInput
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange({
        id,
        value: e.target.value,
      })}
    />
  );
};

export default LongtextInput;
