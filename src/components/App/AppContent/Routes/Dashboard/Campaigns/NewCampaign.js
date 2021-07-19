import { useState } from 'react';

import { useBoolState, useCollection } from '../../../../../../hooks';
import { Button, ButtonRow, H, Input, Loading, Page, VerticalList } from '../../../../../ui';
import { stringToKey } from '../../../../../../utilities';

const NewCampaign = ({ close }) => {
  const [formData, setFormData] = useState({
    name: '',
    campaignKey: '',
  });
  const [isKeyUnique, setIsKeyUnique] = useBoolState(true);
  const [campaigns, isCampaignsLoading] = useCollection('campaigns');

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
    if (id === 'campaignKey') {
      const existingKeys = campaigns 
        ? campaigns.filter(c => c.key === value)
        : [];
      setIsKeyUnique(existingKeys.length === 0);
    }
  };

  const generateKey = () => {
    if (!formData.campaignKey) {
      setFormData({
        ...formData,
        campaignKey: stringToKey(formData.name),
      });
    }
  };

  if (isCampaignsLoading) {
    return <Loading />;
  }

  const listItems = [
    {
      label: 'Campaign Name',
      content: (
        <Input
          id="name"
          value={formData.name}
          onChange={handleFieldChange}
          onBlur={generateKey}
        />
      ),
    },
    {
      label: 'Campaign Key',
      content: (
        <Input
          id="campaignKey"
          value={formData.campaignKey}
          onChange={handleFieldChange}
        />
      ),
      detail: (
        <>
          <div>URL for the campaign. Must be unique.</div>
          {!isKeyUnique && <div>Key is already in use. Please choose another.</div>}
        </>
      ),
    }
  ];

  return (
    <Page>
      <H l={1} centered>New Campaign</H>
      <form>
        <VerticalList items={listItems} />
        <ButtonRow>
          <Button onClick={close}>Cancel</Button>
        </ButtonRow>
      </form>
    </Page>
  );
};

export default NewCampaign;
