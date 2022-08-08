import styled from "styled-components";

import { useCampaign, useToggledModal } from "../../../../../../hooks";
import { Box, Button, H, ItemList, Page, PageHeader } from "../../../../../ui";
import { formatDate } from "../../../../../../utilities";
import AddSession from './AddSession';

const ItemLayout = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-template-columns: 3em 1fr max-content;
    grid-gap: ${space.md};
  `;
});

const NumberCell = styled.div`
  display: grid;
  align-items: center;
  font-weight: bold;
  justify-items: center;
`;

const Sessions = () => {
  const { key: campaignKey, sessions } = useCampaign();
  const [addModal, toggleAddModal] = useToggledModal(AddSession);

  const listItems = sessions.map(({ id, date, locationName, name, sessionNumber }) => {
    const dateLocationString = locationName
      ? `${locationName} - ${formatDate(date.toDate())}`
      : formatDate(date.toDate());

    return ({
      key: id,
      content: (
        <ItemLayout>
          <NumberCell>{sessionNumber}</NumberCell>
          <div>
            <H l={3} compact>{name}</H>
          </div>
          <div>
            {dateLocationString}
          </div>
        </ItemLayout>
      ),
      to: `/campaign/${campaignKey}/session/${id}`,
    });
  });

  return (
    <Page>
      {addModal}
      <PageHeader
        title="Sessions"
        content={(
          <Button
            small
            label="New Session"
            onClick={toggleAddModal}
          />
        )}
        campaignKey={campaignKey}
        breadcrumbs={[]}
      />
      <Box>
        <ItemList isLinks items={listItems} />
      </Box>
    </Page>
  );
};

export default Sessions;
