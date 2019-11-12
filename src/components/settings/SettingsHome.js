import React from "react";
import { useRouteMatch } from "react-router-dom";

import { Link, Page } from "../ui";

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
