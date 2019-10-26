import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const SettingsHome = () => {
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>Settings</h1>
      <ul>
        <li>
          <Link to={`${url}/collections`}>Collections</Link>
        </li>
        <li>
          <Link to={`${url}/menus`}>Menus</Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingsHome;
