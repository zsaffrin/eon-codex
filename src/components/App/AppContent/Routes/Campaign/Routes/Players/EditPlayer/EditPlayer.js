import { useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import { EditRecord } from '../../../../../../../shared';

const EditPlayer = ({ player, close }) => {
  const [schema, isSchemaLoading] = useSchema('players');

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <H l={1}>Edit Player</H>
      <EditRecord
        onCancel={close}
        onSaveSuccess={close}
        schema={schema}
        record={player}
        excludeFieldIds={['campaign', 'user', 'isEditor', 'isOwner']}
      />
    </Page>
  );
};

export default EditPlayer;
