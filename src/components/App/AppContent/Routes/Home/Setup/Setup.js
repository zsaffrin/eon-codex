import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Collection from './Collection';
import Schema from './Schema';

const Setup = () => {
  return (
    <Routes>
      <Route path={'*'} element={<Home />} />
      <Route path={'collection/:collectionId'} element={<Collection />} />
      <Route path={'schema/:schemaId'} element={<Schema />} />
    </Routes>
  );
};

export default Setup;
