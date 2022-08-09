import { Navigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign, useToggledModal } from '../../../../../../hooks';
import { Box, Button, ButtonRow, HeaderRow, Link, Markdown, Page, PageHeader } from '../../../../../ui';
import { formatDate } from '../../../../../../utilities';
import EditSession from './EditSession';
import EditSessionMdField from './EditSessionMdField';
import ParticipantList from './ParticipantList';

const Pretitle = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: ${space.md};
    justify-items: start;
    align-items: center;
  `;
});
const BoldText = styled.div`
  font-size: 1.25em;
  font-weight: bold;
`;

const Session = () => {
  const { sessionId } = useParams();
  const { key: campaignKey, characters, sessions } = useCampaign();
  const [editModal, toggleEditModal] = useToggledModal(EditSession);
  const [editFieldModal, toggleEditFieldModal] = useToggledModal(EditSessionMdField);

  const session = sessions.find(({ id }) => sessionId === id);

  if (!sessionId || !session) {
    return <Navigate to={`/campaign/${campaignKey}/sessions`} />;
  }

  const previousSession = sessions.find(({ sessionNumber }) => (
    sessionNumber === (session.sessionNumber - 1)
  ));
  const nextSession = sessions.find(({ sessionNumber }) => (
    sessionNumber === (session.sessionNumber + 1)
  ));

  const pretitle = (
    <Pretitle>
      {previousSession && (
        <Link to={`/campaign/${campaignKey}/session/${previousSession.id}`}>
          {'<'}
        </Link>
      )}
      <BoldText>{`Session ${session.sessionNumber}`}</BoldText>
      {nextSession && (
        <Link to={`/campaign/${campaignKey}/session/${nextSession.id}`}>
          {'>'}
        </Link>
      )}
    </Pretitle>
  );

  const participantCharacters = characters.filter(({ id }) => (
    session.participants ? session.participants.includes(id) : false
  ));

  return (
    <Page>
      {editModal}
      {editFieldModal}
      <PageHeader
        pretitle={pretitle}
        title={session.name}
        campaignKey={campaignKey}
        breadcrumbs={[{
          label: 'Sessions',
          target: `/campaign/${campaignKey}/sessions`,
        }]}
        content={(
          <ButtonRow>
            <Button
              small
              icon={<FaEdit />}
              label="Edit Session"
              onClick={() => toggleEditModal(session)}
            />
          </ButtonRow>
        )}
      />
      <div>
        {session.date && (
          <div>{`Played: ${formatDate(session.date.toDate())}`}</div>
        )}
        {session.location && (
          <div>{`Location: ${session.locationName}`}</div>
        )}
      </div>
      <Box>
        <HeaderRow compact title="Participants" />
        <ParticipantList participants={participantCharacters} />
      </Box>
      <Box>
        <HeaderRow
          compact
          title="Recap"
          content={(
            <ButtonRow>
              <Button
                small
                icon={<FaEdit />}
                title="Edit Recap"
                onClick={() => toggleEditFieldModal({ 
                  record: session, 
                  fieldKey: 'recap',
                  pageTitle: 'Edit Recap',
                })}
              />
            </ButtonRow>
          )}
        />
        <Markdown content={session.recap} />
      </Box>
      <Box>
        <HeaderRow
          compact
          title="Live Notes"
          content={(
            <ButtonRow>
              <Button
                small
                icon={<FaEdit />}
                title="Edit Live Notes"
                onClick={() => toggleEditFieldModal({ 
                  record: session, 
                  fieldKey: 'liveNotes',
                  pageTitle: 'Edit Live Notes',
                })}
              />
            </ButtonRow>
          )}
        />
        <Markdown content={session.liveNotes} />
      </Box>
    </Page>
  );
};

export default Session;
