import { AiFillHome } from 'react-icons/ai';
import styled from 'styled-components';

import { formatDate } from '../../../../../../../../utilities';
import { useCampaign, useToggle } from '../../../../../../../../hooks';
import { Box, Breadcrumb, ButtonRow, Button, H, Link, Markdown, Modal, Page, TitleRow } from '../../../../../../../ui';
import EditSession from '../EditSession';

const InfoLine = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: ${space.md};
  `;
});
const InfoLineTitle = styled.div`
  font-weight: bold;
`;

const Session = ({ session }) => {
  const { key: campaignKey, locations } = useCampaign();
  const [isEditing, setIsEditing] = useToggle();
  const { name, date, liveNotes, location, number, recap } = session;

  const locationDetail = locations.find(l => l.id === location);

  return (
    <Page>
      {isEditing && (
        <Modal>
          <EditSession close={setIsEditing} session={session} />
        </Modal>
      )}
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            <Link to={`/campaign/${campaignKey}/sessions`}>
              Sessions
            </Link>,
          ]} />
          <H l={3} compact>{`Session ${number}`}</H>
          {name && (<H l={1} compact>{name}</H>)}
        </div>
        <ButtonRow>
          <Button onClick={setIsEditing}>Edit</Button>
        </ButtonRow>
      </TitleRow>
      <div>  
        <InfoLine>
          <InfoLineTitle>Date:</InfoLineTitle>
          <div>{date && formatDate(date.toDate())}</div>
        </InfoLine>
        <InfoLine>
          <InfoLineTitle>Location:</InfoLineTitle>
          <div>{locationDetail && locationDetail.name}</div>
        </InfoLine>
      </div>
      <Box>
        <H l={2} compact>Recap</H>
        <Markdown content={recap} />
      </Box>
      <Box>
        <H l={2} compact>Live Notes</H>
        <Markdown content={liveNotes} />
      </Box>
    </Page>
  );
};

export default Session;
