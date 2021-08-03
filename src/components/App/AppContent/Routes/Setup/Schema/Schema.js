import { useHistory, useParams } from 'react-router-dom';
import { BiCheck, BiX } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

import { useSchema } from '../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, Link, Loading, Page, TitleRow } from '../../../../../ui';
import SchemaFieldTable from './SchemaFieldTable';

const Details = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
    grid-auto-flow: column;
  `;
});

const Schema = () => {
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
        <TitleRow>
          <H l={2} compact>Details</H>
          <ButtonRow compact>
            <Button>
              <GoPencil />
            </Button>
          </ButtonRow>
        </TitleRow>
        <Details>
          <div>
            {`Record Name: ${schema.recordName}`}
          </div>
          <div>
            {'Specify Id? '}
            {schema.specifyId ? <BiCheck /> : <BiX />}
          </div>
          <div>
            {'Per Campaign? '}
            {schema.isPerCampaign ? <BiCheck /> : <BiX />}
          </div>
        </Details>
      </Box>
      <Box>
        <TitleRow>
          <H l={2} compact>Fields</H>
          <ButtonRow compact>
            <Button>
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
