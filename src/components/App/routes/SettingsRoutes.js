import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { CollectionsHome, MenusHome, SettingsHome } from "../../settings";
import ManageCollection from "../../settings/ManageCollection";
import { ManageMenu } from "../../settings/ManageMenus";
import ManageSchema from "../../settings/ManageSchema";

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
    </Switch>
  );
};

export default SettingsRoutes;
