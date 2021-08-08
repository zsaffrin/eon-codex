import { H, Page } from "../../../../../ui";
import { EditRecord } from '../../../../../shared';

const EditCollectionRecord = ({ close, item, schema }) => {
  return (
    <Page>
      <H l={1}>{`Edit ${schema.recordName}`}</H>
      <EditRecord 
        onCancel={close}
        onDeleteSuccess={close}
        onSaveSuccess={close}
        schema={schema}
        record={item}
      />
    </Page>
  );
};

export default EditCollectionRecord;
