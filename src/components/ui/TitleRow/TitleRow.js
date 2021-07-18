import styled from 'styled-components';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
`;

const TitleRow = ({ children }) => {
  return (
    <StyledRow>
      {children}
    </StyledRow>
  );
};

export default TitleRow;
