import { arrayOf, shape } from 'prop-types';
import { useMessage } from '../../../../../hooks';
import { Link, Page } from '../../../../ui';
import Header from './Header';

const CampaignError = ({ error }) => {
  const [message] = useMessage('error', error);

  return (
    <>
      <Header noCampaign />
      <Page>
        {message}
        <div>
          <Link to="/">Return Home</Link>
        </div>
      </Page>
    </>
  );
};
CampaignError.propTypes = {
  campaigns: arrayOf(shape({})),
  campaign: shape({}),
};
CampaignError.defaultProps = {};

export default CampaignError;
