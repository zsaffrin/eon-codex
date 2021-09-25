import { AiFillHome } from 'react-icons/ai';
import styled from 'styled-components';

import { formatDate, sortBy } from '../../../../../../../../utilities';
import { useCampaign, useToggle } from '../../../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, ItemList, Link, Modal, Page, TitleRow } from '../../../../../../../ui';
import AddSession from '../AddSession';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-template-columns: 3rem 2fr 3fr;
    grid-gap: ${space.md};

    & > * {
      padding: ${space.md};
    }
  `;
});

const SessionsHome = () => {
  const { key: campaignKey, locations, sessions } = useCampaign();
  const [isAdding, setIsAdding] = useToggle();

  const listItems = sortBy(sessions, 'number', 'desc').map(({ id, date, location, name, number }) => {
    const locationDetail = locations.find(l => l.id === location);
    
    return ({
      id,
      url: `/campaign/${campaignKey}/sessions/${id}`,
      content: (
        <StyledItem>
          <H l={3} compact>{number}</H>
          <H l={3} compact>{name}</H>
          <div>{date && formatDate(date.toDate())}{locationDetail && ` - ${locationDetail.name}`}</div>
        </StyledItem>
      )
    });
  });

  return (
    <Page>
      {isAdding && (
        <Modal>
          <AddSession close={setIsAdding} />
        </Modal>
      )}
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            'Sessions'
          ]} />
          <H l={1} compact>Sessions</H>
        </div>
        <ButtonRow compact>
          <Button onClick={setIsAdding}>New Session</Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        <ItemList items={listItems} />
      </Box>
    </Page>
  );
};

export default SessionsHome;
