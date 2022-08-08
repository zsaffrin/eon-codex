import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { stringToKey } from '../../../../../../../utilities';
import { Box, Button, ButtonRow, Input, Page, PageHeader, VerticalList } from '../../../../../../ui';
import { useFirebase, useMessage, useUser } from '../../../../../../../hooks';

const StyledForm = styled.form(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;  
    grid-gap: ${space.md};
  `;
});
const StyledItemContent = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;  
    grid-gap: ${space.sm};
  `;
});
const MessageInput = styled(Input)(({ status, theme }) => {
  const { messages } = theme;

  if (status === 'error') {
    return `background: ${messages.errorBackground}`;
  }
  if (status === 'success') {
    return `background: ${messages.successBackground}`;
  }

  return;
});

const AddCampaign = ({ campaignKeys, close }) => {
  const [user] = useUser();
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    name: '',
    campaignKey: '',
  });
  const [isKeyUnique, setIsKeyUnique] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formValidationError, setFormValidationError] = useState(null);
  const [message, setMessage] = useMessage();

  useEffect(() => {
    if (campaignKeys.includes(formData.campaignKey)) {
      setIsKeyUnique(false);
    } else {
      setIsKeyUnique(true);
    }
  }, [campaignKeys, formData.campaignKey]);

  useEffect(() => {
    if (!formData.name || !formData.campaignKey) {
      setFormValidationError('Campign must have a title and unique key');
    } else if (formData.campaignKey.length < 3) {
      setFormValidationError('Key must be at least 3 characters');
    } else if (!isKeyUnique) {
      setFormValidationError('Key must be unique');
    } else {
      setFormValidationError(null);
    }
  }, [formData, isKeyUnique]);

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleKeyFieldChange = ({ value }) => {
    setFormData({
      ...formData,
      campaignKey: stringToKey(value),
    });
  };

  const handleCancel = () => {
    close();
  };

  const insertCampaign = () => {
    return firebase.addDocument('campaigns', {
      name: formData.name,
      key: formData.campaignKey,
      createdBy: user.id,
    });
  };

  const insertPlayer = (campaignId) => {
    return firebase.addDocument('players', {
      campaign: campaignId,
      isOwner: true,
      isEditor: true,
      user: user.id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    if (formValidationError) {
      setMessage('error', formValidationError);
      setIsProcessing(false);
    } else {
      try {
        const addCampaignResult = await insertCampaign();
        if (!addCampaignResult.id) {
          setMessage('error', addCampaignResult, true);
          setIsProcessing(false);
        } else {
          const addPlayerResult = await insertPlayer(addCampaignResult.id);
          if (!addPlayerResult.id) {
            setMessage('error', addPlayerResult, true);
            setIsProcessing(false);
          } else { close(); }
        }
      } catch (err) {
        setMessage('error', err, true); 
        setIsProcessing(false);
      }
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

  const buttonRow = (
    <ButtonRow>
      <Button 
        primary
        label="Create Campaign" 
        type="Submit" 
        onClick={handleSubmit} 
        disabled={isProcessing}
      />
      <Button
        label="Cancel"
        onClick={handleCancel}
        disabled={isProcessing}
      />
    </ButtonRow>
  );

  const listItems = [
    {
      label: 'Campaign Title',
      content: (
        <Input
          id="name"
          onBlur={generateKey}
          onChange={handleFieldChange}
          value={formData.name}
          type="text"
        />
      ),
    },
    {
      label: 'Unique Key',
      content: (
        <StyledItemContent>
          <MessageInput
            id="campaignKey"
            onChange={handleKeyFieldChange}
            value={formData.campaignKey}
            type="text"
            status={isKeyUnique ? null : 'error'}
          />
          {!isProcessing && !isKeyUnique && <div>Key is not unique</div>}
        </StyledItemContent>
      ),
    },
    {
      fullRow: true,
      content: buttonRow,
    },
  ];

  return (
    <Page>
      <PageHeader title="Create New Campaign" />
      <Box>
        {message}
        <StyledForm onSubmit={handleSubmit}>
          <VerticalList items={listItems} />
        </StyledForm>
      </Box>
    </Page>
  );
};
AddCampaign.propTypes = {
  close: func,
};
AddCampaign.defaultProps = {
  close: () => {},
};

export default AddCampaign;
