import styled from 'styled-components';

import { H } from '../../../../../../../../ui';

const Layout = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});

const CampaignSettings = () => {
  return (
    <Layout>
      <div>
        Name Key
      </div>
      <div>
        <H l={3}>Info Categories</H>
        Groups People Places
      </div>
    </Layout>
  );
};

export default CampaignSettings;
