import { useCollection, useToggle } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Link, Loading, Modal, Page, TitleRow } from '../../../../../ui';
import AddSchema from './AddSchema';

const Home = () => {
  const [isAddingSchema, setIsAddingSchema] = useToggle();
  const [schemas, isSchemasLoading] = useCollection('schemas');

  if (isSchemasLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <H l={1} compact>Setup</H>
      <Box>
        {isAddingSchema && (
          <Modal>
            <AddSchema close={setIsAddingSchema} />
          </Modal>
        )}
        <TitleRow>
          <H l={2} compact>Collections</H>
          <ButtonRow compact>
            <Button onClick={setIsAddingSchema}>New Schema</Button>
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
