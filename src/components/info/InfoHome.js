import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const InfoHome = () => {
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>Info</h1>
      <ul>
        <li>
          <Link to={`${url}/places`}>Places</Link>
        </li>
      </ul>
    </div>
  );
};

export default InfoHome;
