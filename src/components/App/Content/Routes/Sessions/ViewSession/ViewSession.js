import React, { useState } from 'react';
import { arrayOf, shape } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  Auth, ButtonRow, Button, Breadcrumb, H, Link, Modal, Page,
} from '../../../../../ui';
import { EditRecord } from '../../../shared';
import SessionNav from './SessionNav';
import ViewPlannedSession from './ViewPlannedSession';
import ViewPlayedSession from './ViewPlayedSession';
import ViewPlayingSession from './ViewPlayingSession';

const PageLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.xl};
  `;
});
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewSession = ({ sessions }) => {
  const { sessionId } = useParams();
  const [editSession, setEditSession] = useState(false);
  const session = sessions.find(({ id }) => id === sessionId) || {};
  const history = useHistory();

  const toggleEditSession = () => {
    setEditSession(!editSession);
  };

  let content = (
    <>
      <div>There&apos;s some kind of problem with the Session status</div>
      <Link to="/sessions">Back to Sessions list</Link>
    </>
  );
  if (session) {
    // Planned Session
    if (session.status === 'AaFuilqJ0uweQM4a9ku5') {
      content = <ViewPlannedSession session={session} />;
    }
    // Playing Session
    if (session.status === 'GWEix8bXkdVMx4oYYYBa') {
      content = <ViewPlayingSession session={session} />;
    }
    // Played Session
    if (session.status === 'DA85QyTND1xgmFo7u7Dg') {
      content = <ViewPlayedSession session={session} />;
    }
  }

  const { name, sessionNumber } = session;

  return (
    <Page>
      <PageLayout>
        {/* Edit Session */}
        {/* Active when state editSession = true */}
        {editSession && (
          <Modal>
            <EditRecord
              schemaId="sessions"
              onCancel={toggleEditSession}
              onSaveSuccess={toggleEditSession}
              onDeleteSuccess={() => history.push('/sessions')}
              recordData={session}
            />
          </Modal>
        )}

        {/* Breadcrumb Row */}
        <Breadcrumb
          items={[
            <Link to="/sessions">Sessions</Link>,
            `${sessionNumber}${name ? ` - ${name}` : ''}`,
          ]}
        />

        {/* Session Nav */}
        <SessionNav sessions={sessions} currentSession={session} />

        {/* Header Row */}
        <HeaderRow>
          <div>
            <H l={3} compact>{`Session ${sessionNumber}`}</H>
            <H l={1} compact>{name}</H>
          </div>
          <ButtonRow>
            <Auth level={3}>
              <Button small onClick={toggleEditSession}>Edit</Button>
            </Auth>
          </ButtonRow>
        </HeaderRow>

        {content}
      </PageLayout>
    </Page>
  );
};
ViewSession.propTypes = {
  sessions: arrayOf(shape({})),
};
ViewSession.defaultProps = {
  sessions: [],
};

export default ViewSession;
