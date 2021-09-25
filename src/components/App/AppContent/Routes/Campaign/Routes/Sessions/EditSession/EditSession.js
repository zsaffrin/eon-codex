import { useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import { EditRecord } from '../../../../../../../shared';

const EditSession = ({ session, close }) => {
  const [schema, isSchemaLoading] = useSchema('sessions');

  if (isSchemaLoading) {
    return <Loading />;
  }
  
  const excludeFields = ['campaign'];

  return (
    <Page>
      <H l={1}>Edit Session</H>
      <EditRecord
        onCancel={close}
        onSaveSuccess={close}
        schema={schema}
        record={session}
        excludeFieldIds={excludeFields}
      />
    </Page>
  );
};

export default EditSession;
