import { Link, Page } from '../../../../ui';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header />
      <Page>
        <div>
          The Eon Codex is a progress and information repository for your adventuring campaigns
        </div>
        <div>
          <Link to='/login'>Log in</Link>
          {' '}
          to get started
        </div>
      </Page>
    </>
    
  );
};

export default Home;
