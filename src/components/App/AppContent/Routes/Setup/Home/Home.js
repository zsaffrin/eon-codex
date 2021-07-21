import { useCollection } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Link, Loading, Page, TitleRow } from '../../../../../ui';

const Home = () => {
  const [schemas, isSchemasLoading] = useCollection('schemas');

  if (isSchemasLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <H l={1} compact>Setup</H>
      <Box>
        <TitleRow>
          <H l={2} compact>Schemas</H>
          <ButtonRow compact>
            <Button>New</Button>
          </ButtonRow>
        </TitleRow>
        <div>
          <ul>
            {schemas.map(({ id, name }) => (
              <li key={id}>
                <Link to={`/setup/collection/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </Page>
  );
};

export default Home;
