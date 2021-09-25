import { Link, Page, Message } from '../../../../ui';

const CampaignError = () => {
  return (
    <Page>
      <Message type="error">
        <p>
          There was an error loading campaign data. 
          There is either an access issue or the database is unavailable.
        </p>
        <p>
          <Link to="/">Return home</Link>
        </p>
      </Message>
    </Page>
  );
};

export default CampaignError;
