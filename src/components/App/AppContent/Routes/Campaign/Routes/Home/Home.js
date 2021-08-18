import styled from 'styled-components';

import { Box, H, Page } from "../../../../../../ui";

const Layout = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
    grid-template-columns: 1fr 1fr 1fr;
  `;
});

const Home = () => {
  return (
    <Page>
      <H l={1}>Campaign Home</H>
      <Layout>
        <Box>
          <H l={2}>Sessions</H>
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
          <H l={2}>Characters</H>
        </Box>
        <Box>
          <H l={2}>Playlists</H>
        </Box>
      </Layout>
    </Page>
  );
};

export default Home;
