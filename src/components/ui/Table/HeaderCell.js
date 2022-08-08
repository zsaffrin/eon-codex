import styled from 'styled-components';

const StyledCell = styled.th(({ centered, theme }) => {
  const { space } = theme;

  return `
    padding: ${space.thin} ${space.sm};
    text-align: ${centered ? 'center' : 'left'};
    vertical-align: bottom;
  `;
});

const HeaderCell = ({ data }) => {
  const { title, type } = data;

  return (
    <StyledCell centered={type === 'boolean' ? 1 : 0}>
      {title}
    </StyledCell>
  );
};

export default HeaderCell;
