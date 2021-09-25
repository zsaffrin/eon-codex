import { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

import { useCampaign, useToggle } from '../../../../../../../../../hooks';
import { Button, ButtonRow, H, Modal, Table, TitleRow } from '../../../../../../../../ui';
import InvitePlayer from './InvitePlayer';
import DeleteInvitation from './DeleteInvitation';

const Invitations = () => {
  const { invitations } = useCampaign();
  const [isAdding, setIsAdding] = useToggle();
  const [deleteInvite, setDeleteInvite] = useState();

  const columns = [
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'invitedByPlayer',
      title: 'Invited By',
      type: 'lookup',
      lookup: 'players',
    },
    {
      key: 'status',
      title: 'Status',
      type: 'lookup',
      lookup: 'invitationStatuses',
    }
  ];
  const actions = [
    {
      label: <FaTimesCircle />,
      title: 'Cancel Invitation',
      action: setDeleteInvite,
    }
  ];
  
  return (
    <>
      {isAdding && (
        <Modal>
          <InvitePlayer close={setIsAdding} />
        </Modal>
      )}
      {deleteInvite && (
        <Modal>
          <DeleteInvitation 
            invitation={deleteInvite} 
            close={() => setDeleteInvite(null)} 
          />
        </Modal>
      )}
      <TitleRow>
        <H l={2} compact>Invitations</H>
        <ButtonRow compact>
          <Button small onClick={setIsAdding}>Invite Player</Button>
        </ButtonRow>
      </TitleRow>
      <Table
        columns={columns}
        entries={invitations}
        actions={actions}
      />
    </>
  );
};

export default Invitations;
