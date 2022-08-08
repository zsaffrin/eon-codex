import styled from 'styled-components';

const StyledPage = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    padding: ${layout.padding};
  `;
});
const Container = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
    max-width: 72em;
    margin-left: auto;
    margin-right: auto;
  `;
});

const Page = ({ children }) => {
  return (
    <StyledPage>
      <Container>
        {children}
      </Container>
    </StyledPage>
  );
};

export default Page;
