import { useSchema } from "../../../../../../hooks";
import { H, Loading, Page } from "../../../../../ui";
import { EditRecord } from '../../../../../shared';

const EditSchemaDetails = ({ close, schema }) => {
  const [schemaSchema, schemaSchemaLoading] = useSchema('schemas');

  if (schemaSchemaLoading) {
    return <Loading />;
  }
  
  return (
    <Page>
      <H l={1}>Edit Schema Details</H>
      <EditRecord 
        onCancel={close}
        onSuccess={close}
        schema={schemaSchema}
        record={schema}
        noDelete
      />
    </Page>
  );
};

export default EditSchemaDetails;
