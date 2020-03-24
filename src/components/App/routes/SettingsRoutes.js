import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import {
  CollectionsHome,
  ManageCollection,
  MenusHome,
  SettingsHome,
} from '../../settings';
import { ManageMenu } from '../../settings/ManageMenus';
import ManageSchema from '../../settings/ManageSchema';
import EditSchemaField from '../../settings/ManageSchema/EditSchemaField';

const SettingsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <SettingsHome />
      </Route>

      <Route path={`${path}/collections`} exact>
        <CollectionsHome />
      </Route>
      <Route path={`${path}/collection/:collectionName`}>
        <ManageCollection />
      </Route>

      <Route path={`${path}/menus`} exact>
        <MenusHome />
      </Route>
      <Route path={`${path}/menu/:menuName`} exact>
        <ManageMenu />
      </Route>

      <Route path={`${path}/schemas`} exact>
        <MenusHome />
      </Route>
      <Route path={`${path}/schema/:schemaName`}>
        <ManageSchema />
      </Route>
      <Route path={`${path}/schemaField/:collectionName/:schemaFieldId?`}>
        <EditSchemaField />
      </Route>
    </Switch>
  );
};

export default SettingsRoutes;
