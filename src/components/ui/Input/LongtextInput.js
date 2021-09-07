import styled from 'styled-components';

const StyledInput = styled.textarea(({ height, theme }) => {
  const { input } = theme;
  return `
    background: ${input.inputBg};
    border: ${input.inputBorder};
    border-radius: ${input.inputBorderRadius};
    padding: ${input.inputPadding};
    font-size: ${input.inputFontSize};
    min-height: ${height || '4rem'};
    width: 100%;

    &:focus {
      outline: 0;
      background: ${input.inputActiveBg};
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
