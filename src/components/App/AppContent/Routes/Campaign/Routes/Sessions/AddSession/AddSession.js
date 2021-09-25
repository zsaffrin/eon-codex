import { objectifyArray } from '../../../../../../../../utilities';
import { useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import AddSessionForm from './AddSessionForm';

const AddSession = ({ close }) => {
  const [schema, isSchemaLoading] = useSchema('sessions');

  if (isSchemaLoading) {
    return <Loading />;
  }

  const schemaFields = objectifyArray(schema.fields, 'key');

  return (
    <Page>
      <H l={1}>New Session</H>
      <AddSessionForm 
        fields={schema.fields}
        fieldObj={schemaFields}
        onCancel={close}
        onSuccess={close}
      />
    </Page>
  );
};

export default AddSession;
