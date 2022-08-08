import { useUser } from '../../../../../../hooks';
import { Page, PageHeader } from '../../../../../ui';
import UserInfo from './UserInfo';

const Profile = () => {
  const [user] = useUser();
  
  return (
    <Page>
      <PageHeader
        title="My Profile"
        breadcrumbs={[]}
      />
      <UserInfo userdata={user} />
    </Page>
  );
};

export default Profile;
