import { useState } from 'react';

import { useCollection, useFirebase, useMessage, useUser } from '../../../../../../hooks';
import { Button, ButtonRow, H, Input, Loading, Page, VerticalList } from '../../../../../ui';
import { stringToKey } from '../../../../../../utilities';

const NewCampaign = ({ close }) => {
  const [user] = useUser();
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    name: '',
    campaignKey: '',
  });
  const [isKeyUnique, setIsKeyUnique] = useState(true);
  const [campaigns, isCampaignsLoading] = useCollection('campaigns');
  const [message, setMessage] = useMessage();

  const handleFieldChange = ({ id, value }) => {
    if (id === 'campaignKey') {
      const existingKeys = campaigns 
        ? campaigns.filter(c => c.key === value)
        : [];
      setIsKeyUnique(existingKeys.length === 0);
      setFormData({
        ...formData,
        campaignKey: stringToKey(value),
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
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

  const isFormValid = () => {
    if (!formData.name) {
      setMessage('error', 'Campaign Name is required');
      return false;
    }
    if (!formData.campaignKey) {
      setMessage('error', 'Campaign Key is required');
      return false;
    }
    if (!isKeyUnique) {
      setMessage('error', 'Campaign Key must be unique');
      return false;
    }

    return true;
  };

  const insertCampaign = () => {
    return firebase.addDoc('campaigns', {
      name: formData.name,
      key: formData.campaignKey,
      createdBy: user.uid,
    });
  };
  const insertPlayer = (campaignId) => {
    return firebase.addDoc('players', {
      campaign: campaignId,
      name: user.name,
      isOwner: true,
      isEditor: true,
      user: user.uid,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage();
    if (isFormValid()) {
      try {
        const addCampaignResult = await insertCampaign();
        if (addCampaignResult.status === 'error') {
          setMessage('error', addCampaignResult.result);
        } else if (addCampaignResult.status === 'success') {
          const addPlayerResult = await insertPlayer(addCampaignResult.result.id);
          if (addPlayerResult.status === 'error') {
            setMessage('error', addPlayerResult.result);
          } else if (addPlayerResult.status === 'success') {
            close();
          } else {
            setMessage('error', 'Unknown add player error');  
          }
        } else {
          setMessage('error', 'Unknown add campaign error');
        }
      } catch (err) { setMessage('error', err, true); }
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
      {message}
      <form onSubmit={handleSubmit}>
        <VerticalList items={listItems} />
        <ButtonRow>
          <Button primary type="submit">Create Campaign</Button>
          <Button onClick={close}>Cancel</Button>
        </ButtonRow>
      </form>
    </Page>
  );
};

export default NewCampaign;
