import { useCampaign } from '../../../../../../../../hooks';
import { H, Page } from '../../../../../../../ui';
import { AddRecord } from '../../../../../../../shared';

const AddCollectionRecord = ({ close, schema }) => {
  const campaign = useCampaign();

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
          },
          {
            id: 'campaign',
            value: campaign.id,
          }
        ]}
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

export default AddCollectionRecord;
