import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Page } from "../ui";

const SettingsHome = () => {
  const { url } = useRouteMatch();

  return (
    <Page>
      <h1>Settings</h1>
      <ul>
        <li>
          <Link to={`${url}/collections`}>Collections</Link>
        </li>
        <li>
          <Link to={`${url}/menus`}>Menus</Link>
        </li>
      </ul>
    </Page>
  );
};

export default SettingsHome;
