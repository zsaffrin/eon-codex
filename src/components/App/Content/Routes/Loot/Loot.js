import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import LootHome from './LootHome';

const Loot = () => {
  const { path } = useRouteMatch();
  const [loot, lootLoading] = useCollection('loot');

  return lootLoading ? <Loading /> : (
    <Switch>
      <Route path={path} exact>
        <LootHome items={loot} />
      </Route>
    </Switch>
  );
};

export default Loot;
