import { Routes, Route } from 'react-router-dom';

import { useUser } from '../../../../../hooks';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Setup from './Setup';

const Home = () => {
  const [user] = useUser();
  
  return (
    <>
      <Header />
      <Routes>
        <Route index element={user ? <Dashboard /> : <Landing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setup/*" element={<Setup />} />
      </Routes>
    </>
  );
};

export default Home;
