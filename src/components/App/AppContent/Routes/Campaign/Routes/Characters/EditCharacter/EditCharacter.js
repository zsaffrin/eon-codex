import { useCampaign, useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import { EditRecord } from '../../../../../../../shared';

const EditCharacter = ({ character, close }) => {
  const campaign = useCampaign();
  const [schema, isSchemaLoading] = useSchema('characters');

  if (isSchemaLoading) {
    return <Loading />;
  }

  const excludeFields = ['campaign'];
  //TODO: Don't exclude Player selection if user has sufficient privileges
  excludeFields.push('player');

  return (
    <Page>
      <H l={1}>Edit Character</H>
      <EditRecord
        onCancel={close}
        onDeleteSuccess={close}
        onSaveSuccess={close}
        schema={schema}
        record={character}
        excludeFieldIds={['campaign']}
        filterFields={[
          {
            fieldKey: 'player',
            filterKey: 'campaign',
            value: campaign.id,
          }
        ]}
      />
    </Page>
  );
};

export default EditCharacter;
