import { Button, ButtonRow, H, Page } from '../../../../../ui';

const NewCampaign = ({ close }) => {
  return (
    <Page>
      <H l={1} centered>New Campaign</H>
      <ButtonRow>
        <Button onClick={close}>Cancel</Button>
      </ButtonRow>
    </Page>
  );
};

export default NewCampaign;
