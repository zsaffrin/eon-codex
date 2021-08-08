import { H, Page } from "../../../../../ui";
import { AddRecord } from '../../../../../shared';

const AddCollectionRecord = ({ close, schema }) => {
  return (
    <Page>
      <H l={1}>{`Add ${schema.recordName}`}</H>
      <AddRecord
        schema={schema}
        onCancel={close}
        onSuccess={close}
        imperativeFields={[
          {
            id: 'schema',
            value: schema.id,
          }
        ]}
      />
    </Page>
  );
};

export default AddCollectionRecord;
