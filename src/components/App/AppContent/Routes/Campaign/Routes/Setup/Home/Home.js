import { useLocation } from 'react-router';
import styled from 'styled-components';

import { useCollection } from '../../../../../../../../hooks';
import { Box, ButtonRow, Button, H, Link, Loading, Page, TitleRow } from '../../../../../../../ui';
import CampaignSettings from './CampaignSettings';

const Layout = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${layout.padding};
  `;
});

const Home = () => {
  const { pathname } = useLocation();
  const [schemas, schemasLoading] = useCollection('schemas', ["isPerCampaign","==",true]);

  if (schemasLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <H l={1}>Campaign Setup</H>
      <Layout>
      <Box>
        <TitleRow>
          <H l={2} compact>Settings</H>
          <ButtonRow>
            <Button small>Edit</Button>
          </ButtonRow>
        </TitleRow>
        <CampaignSettings />
      </Box>
      <Box>
        <H l={2} compact>Collections</H>
        <ul>
          {schemas.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${pathname}/collection/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </Box>
      </Layout>
    </Page>
  );
};

export default Home;
