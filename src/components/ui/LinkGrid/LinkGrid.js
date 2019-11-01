import styled from "styled-components";

const LinkGrid = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: 1fr;
  `;
});

export default LinkGrid;
