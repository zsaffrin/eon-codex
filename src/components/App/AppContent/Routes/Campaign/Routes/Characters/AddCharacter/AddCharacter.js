import { useCampaign, usePlayer, useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import { AddRecord } from '../../../../../../../shared';

const AddCharacter = ({ close }) => {
  const [schema, isSchemaLoading] = useSchema('characters');
  const { id: campaignId } = useCampaign();
  const [player] = usePlayer();

  if (isSchemaLoading) {
    return <Loading />;
  }

  const imperativeFields = [
    {
      id: 'campaign',
      value: campaignId,
    }
  ];

  //By default this should be the current User's Player
  //TODO: Make this selectable if user has sufficient privileges
  imperativeFields.push({
    id: 'player',
    value: player.id,
  });
  
  return (
    <Page>
      <H l={1}>Add Character</H>
      <AddRecord
        schema={schema}
        onCancel={close}
        onSuccess={close}
        imperativeFields={imperativeFields}
        filterFields={[
          {
            fieldId: 'player',
            filterKey: 'campaign',
            value: campaignId,
          }
        ]}
      />
    </Page>
  );
};

export default AddCharacter;
