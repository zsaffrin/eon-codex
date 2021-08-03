import { H, Page } from "../../../../../ui";
import { EditRecord } from '../../../../../shared';

const EditSchemaField = ({ close, item, schema }) => {
  return (
    <Page>
      <H l={1}>EditSchemaField</H>
      <EditRecord 
        onCancel={close}
        onSuccess={close}
        schema={schema}
        record={item}
      />
    </Page>
  );
};

export default EditSchemaField;
