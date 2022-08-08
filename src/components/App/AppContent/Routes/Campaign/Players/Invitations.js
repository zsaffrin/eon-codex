import { GoPencil } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

import { useCampaign, useSchema, useToggledModal } from '../../../../../../hooks';
import { Button, HeaderRow, Loading } from '../../../../../ui';
import AddInvitation from './AddInvitation';
import EditInvitation from './EditInvitation';
import CancelInvitation from './CancelInvitation';

const StyledListItem = styled.div(({ theme }) => {
  const { app, layout, space } = theme;

  return `
    background: ${app.backgroundLevel[1]};
    border-radius: ${layout.borderRadius};
    display: block;
    padding: ${space.md};
  `;
});
const ListItemLayout = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-template-columns: 1fr 1fr max-content;
    grid-gap: ${space.md};
    align-items: center;
  `;
});
const ItalicText = styled.div`
  font-style: italic;
`;
const SmallText = styled.div`
  font-size: 0.8em;
`;

const Invitations = () => {
  const { invitations } = useCampaign();
  const [schema, isSchemaLoading] = useSchema('invitations');
  const [addModal, toggleAddModal] = useToggledModal(AddInvitation, { schema });
  const [editModal, toggleEditModal] = useToggledModal(EditInvitation, { schema });
  const [cancelModal, toggleCancelModal] = useToggledModal(CancelInvitation);

  if (isSchemaLoading) {
    return <Loading />;
  }

  const invitationItems = invitations.reduce((acc, invitation) => {
    const { id, email, invitedByName, status } = invitation;

    if (status === 'accepted') {
      return acc;
    }

    let actions = (
      <Button
        small
        icon={<GoPencil />}
        onClick={() => toggleEditModal(invitation)}
      />
    );
    if (status === 'pending') {
      actions = (
        <Button
          small
          icon={<IoClose />}
          title={`Cancel invitation for ${invitation.email}`}
          onClick={() => toggleCancelModal(invitation)}
        />
      );
    }
    
    return [
      ...acc,
      (
        <StyledListItem key={id}>
          <ListItemLayout>
            <div>
              <div>{email}</div>
              <SmallText>{`Invited by ${invitedByName}`}</SmallText>
            </div>
            <ItalicText>
              {status.substring(0,1).toUpperCase() + status.substring(1)}
            </ItalicText>
            <div>
              {actions}
            </div>
          </ListItemLayout>
        </StyledListItem>
      )
    ];
  }, []);

  return (
    <>
      {addModal}
      {editModal}
      {cancelModal}
      <HeaderRow
        title="Invitations"
        content={(
          <Button
            small
            label="Invite Player"
            onClick={() => toggleAddModal()}
          />
        )}
      />
      {invitationItems.length > 0 && (
        <div>
          {invitationItems}
        </div>
      )}
    </>
  );
};

export default Invitations;
