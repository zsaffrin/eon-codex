import { useCampaign } from '../../../../../../../../hooks';
import { H, Page } from '../../../../../../../ui';
import { EditRecord } from '../../../../../../../shared';

const EditCollectionRecord = ({ close, item, schema }) => {
  const campaign = useCampaign();
  
  return (
    <Page>
      <H l={1}>{`Edit ${schema.recordName}`}</H>
      <EditRecord 
        onCancel={close}
        onDeleteSuccess={close}
        onSaveSuccess={close}
        schema={schema}
        record={item}
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

export default EditCollectionRecord;
