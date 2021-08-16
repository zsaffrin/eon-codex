import { useLocation } from 'react-router';

import { useCollection } from '../../../../../../../../hooks';
import { Box, H, Link, Loading, Page } from '../../../../../../../ui';

const Home = () => {
  const { pathname } = useLocation();
  const [schemas, schemasLoading] = useCollection('schemas', ["isPerCampaign","==",true]);

  if (schemasLoading) {
    return <Loading />;
  }

  return (
    <Page>
        <H l={1}>Campaign Setup</H>
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
    </Page>
  );
};

export default Home;
