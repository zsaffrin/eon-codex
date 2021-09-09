import styled from 'styled-components';

import { Box, H, Page } from "../../../../../../ui";
import Characters from './Characters';
import Players from './Players';

const Layout = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  `;
});

const Home = () => {
  return (
    <Page>
      <H l={1}>Campaign Home</H>
      <Layout>
        <Box>
          <H l={2} compact>Sessions</H>
          <div>
            Next / Current
          </div>
          <div>
            Upcoming
          </div>
          <div>
            All...
          </div>
        </Box>
        <Box>
          <H l={2} compact>Characters</H>
          <Characters />
        </Box>
        <Box>
          <H l={2} compact>Players</H>
          <Players />
        </Box>
      </Layout>
    </Page>
  );
};

export default Home;
