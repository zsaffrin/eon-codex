import { bool } from 'prop-types';

import CampaignHeader from './CampaignHeader';
import AppHeader from './AppHeader';

const Header = ({ noCampaign }) => {
  return (
    <div>
      <AppHeader />
      {!noCampaign && <CampaignHeader />}
    </div>
  );
};
Header.propTypes = {
  noCampaign: bool,
};
Header.defaultProps = {
  noCampaign: false,
};

export default Header;
