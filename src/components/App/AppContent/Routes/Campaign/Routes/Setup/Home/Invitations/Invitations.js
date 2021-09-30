import { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';

import { useCampaign, useFirebase, useMessage, useToggle } from '../../../../../../../../../hooks';
import { Button, ButtonRow, H, Modal, Table, TitleRow } from '../../../../../../../../ui';
import InvitePlayer from './InvitePlayer';
import DeleteInvitation from './DeleteInvitation';

const Invitations = () => {
  const { invitations } = useCampaign();
  const [isAdding, setIsAdding] = useToggle();
  const [deleteInvite, setDeleteInvite] = useState();
  const firebase = useFirebase();
  const [message, setMessage] = useMessage();

  const resendInvite = async (invitation) => {
    try {
      const res = await firebase.updateDoc(`invitations/${invitation.id}`, {
        status: 'pending',
      });
      if (res.status === 'error') {
        setMessage('error', res.result);
      } else if (res.status !== 'success') {
        setMessage('error', 'Something went wrong');
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };

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
      label: <BiReset />,
      title: 'Resend Invitation',
      action: resendInvite,
    },
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
        {message}
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
