import styled from 'styled-components';

const StyledBox = styled.div(({ theme }) => {
  const { box, layout } = theme;
  return `
    background: ${box.background};
    border: 1px solid ${box.borderColor};
    border-radius: ${layout.borderRadius};
    display: grid;
    padding: ${layout.padding};
    grid-gap: ${layout.padding};
  `;
});

const Box = ({ children }) => {
  return (
    <StyledBox>
      {children}
    </StyledBox>
  );
};

export default Box;
