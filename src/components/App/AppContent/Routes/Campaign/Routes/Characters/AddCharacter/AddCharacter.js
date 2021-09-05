import { useCampaign, useUser, useSchema } from '../../../../../../../../hooks';
import { H, Loading, Page } from '../../../../../../../ui';
import { AddRecord } from '../../../../../../../shared';

const AddCharacter = ({ close }) => {
  const [user] = useUser();
  const [schema, isSchemaLoading] = useSchema('characters');
  const { id: campaignId, players } = useCampaign();
  const currentUserPlayer = players.find(p => p.user === user.uid);

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
    value: currentUserPlayer.id,
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
