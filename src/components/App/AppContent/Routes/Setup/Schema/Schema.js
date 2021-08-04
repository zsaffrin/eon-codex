import { useHistory, useParams } from 'react-router-dom';
import { BiSquare, BiCheckSquare } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

import { useSchema, useToggle } from '../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, Link, Loading, Modal, Page, TitleRow } from '../../../../../ui';
import EditSchemaDetails from './EditSchemaDetails';
import AddSchemaField from './AddSchemaField';
import SchemaFieldTable from './SchemaFieldTable';

const Details = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
    grid-auto-flow: column;
    align-items: center;
  `;
});
const InlineRow = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-gap: ${space.sm};
  `;
});

const Schema = () => {
  const [adding, setAdding] = useToggle();
  const [isEditingDetails, setIsEditingDetails] = useToggle();
  const { schemaId } = useParams();
  const [schema, isSchemaLoading] = useSchema(schemaId);
  const history = useHistory();

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to="/setup">Setup</Link>,
            'Collection Schemas'
          ]} />
          <H l={1} compact>{schema.name}</H>
        </div>
        <ButtonRow compact>
          <Button onClick={() => history.push(`/setup/collection/${schemaId}`)}>
            Collection
          </Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        {isEditingDetails && (
          <Modal>
            <EditSchemaDetails
              close={setIsEditingDetails}
              schema={schema}
            />
          </Modal>
        )}
        <TitleRow>
          <H l={2} compact>Details</H>
          <ButtonRow compact>
            <Button>
              <GoPencil onClick={setIsEditingDetails} />
            </Button>
          </ButtonRow>
        </TitleRow>
        <Details>
          <div>
            {`Record Name: ${schema.recordName}`}
          </div>
          <InlineRow>
            {schema.specifyId ? <BiCheckSquare /> : <BiSquare />}
            {'Specify Id? '}
          </InlineRow>
          <InlineRow>
            {schema.isPerCampaign ? <BiCheckSquare /> : <BiSquare />}
            {'Per Campaign? '}
          </InlineRow>
        </Details>
      </Box>
      <Box>
        {adding && (
          <Modal>
            <AddSchemaField
              close={setAdding}
              schemaId={schema.id}
            />
          </Modal>
        )}
        <TitleRow>
          <H l={2} compact>Fields</H>
          <ButtonRow compact>
            <Button onClick={setAdding}>
              <FaPlus />
            </Button>
          </ButtonRow>
        </TitleRow>
        <SchemaFieldTable fields={schema.fields} />
      </Box>
    </Page>
  );
};

export default Schema;
