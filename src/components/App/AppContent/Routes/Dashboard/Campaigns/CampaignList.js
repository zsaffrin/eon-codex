import styled from 'styled-components';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.sm};
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `;
});

const CampaignList = ({ campaigns }) => {
  const listItems = campaigns.map(({ id, name }) => (
    <StyledItem key={id}>
      {name}
    </StyledItem>
  ));
  
  return (
    <div>
      {listItems}
    </div>
  );
};

export default CampaignList;
