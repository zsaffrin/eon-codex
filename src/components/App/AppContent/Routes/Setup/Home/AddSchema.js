import { useSchema } from "../../../../../../hooks";
import { H, Loading, Page } from "../../../../../ui";
import { AddRecord } from '../../../../../shared';

const AddSchema = ({ close }) => {
  const [schema, schemaLoading] = useSchema('schemas');

  if (schemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <H l={1}>Create New Schema</H>
      <AddRecord
        schema={schema}
        onCancel={close}
        onSuccess={close}
        imperativeFields={[
          {
            id: 'schema',
            value: 'schemas',
          },
        ]}
      />
    </Page>
  );
};

export default AddSchema;
