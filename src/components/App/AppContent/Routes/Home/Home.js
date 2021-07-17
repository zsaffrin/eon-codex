import { useUser } from '../../../../../hooks';
import { Page } from '../../../../ui';
import Header from './Header';

const Home = () => {
  const [user] = useUser();

  if (!user) {
    return <Page>Not logged in</Page>;
  }
  
  return (
    <>
      <Header />
      <Page>
        <pre>{JSON.stringify(user, ' ', 2)}</pre>
      </Page>
    </>
    
  );
};

export default Home;
