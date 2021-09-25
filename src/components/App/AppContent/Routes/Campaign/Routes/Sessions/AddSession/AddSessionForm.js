import { useState } from 'react';
import { arrayOf, func, shape } from 'prop-types';
import styled from 'styled-components';

import { maxFieldValue } from '../../../../../../../../utilities';
import { useCampaign, useFirebase, useMessage } from '../../../../../../../../hooks';
import { Button, ButtonRow, Input, VerticalList } from '../../../../../../../ui';

const StyledForm = styled.form(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;  
    grid-gap: ${space.lg};
  `;
});

const AddSessionForm = ({ fields, onCancel, onSuccess }) => {
  const [message, setMessage] = useMessage();
  const firebase = useFirebase();
  const { id: campaignId, sessions } = useCampaign();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
  });

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxSessionNumber = maxFieldValue(sessions, 'number');

    const recordToAdd = {
      ...formData,
      campaign: campaignId,
      number: maxSessionNumber ? (maxSessionNumber + 1) : 1,
    };

    try {
      const res = await firebase.addDoc('sessions', recordToAdd);
      if (res.status === 'success') {
        onSuccess(res.result);
      } else if (res.status === 'error') {
        setMessage('error', res.result);
      } else {
        setMessage('error', 'Something went wrong');
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };

  const listItems = [
    {
      label: 'Title',
      content: (
        <Input
          id="name"
          value={formData.name}
          onChange={handleFieldChange}
        />
      )
    },
    {
      label: 'Date',
      content: (
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={handleFieldChange}
        />
      )
    },
    {
      label: 'Location',
      content: (
        <Input
          id="location"
          type="lookup"
          lookup="gamingLocations"
          value={formData.location}
          onChange={handleFieldChange}
        />
      )
    },
  ];

  return (
    <StyledForm onSubmit={handleSubmit}>
      {message}
      <VerticalList items={listItems} />
      <ButtonRow>
        <Button primary type="submit">Add Session</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonRow>
    </StyledForm>
  );
};
AddSessionForm.propTypes = {
  fields: arrayOf(shape({})),
  onCancel: func,
  onSuccess: func,
};
AddSessionForm.defaultProps = {
  fields: [],
  onCancel: () => {},
  onSuccess: () => {},
};

export default AddSessionForm;
