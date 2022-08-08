import { useCollection } from '../../../../../../../hooks';
import { Box, HeaderRow, Link, Loading, Page, PageHeader } from '../../../../../../ui';

const Home = () => {
  const [schemas, schemasLoading] = useCollection('schemas');

  if (schemasLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <PageHeader
        title="Setup"
        breadcrumbs={[]}
      />
      <Box>
        <HeaderRow title="Collections" />
        <ul>
          {schemas.map(({ id, name }) => (
            <li key={id}>
              <Link to={`collection/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </Box>
    </Page>
  );
};

export default Home;
