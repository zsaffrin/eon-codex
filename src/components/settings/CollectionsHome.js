import React from "react";
import { Link } from "react-router-dom";

const CollectionsHome = () => {
  return (
    <div>
      <h1>Collections</h1>
      <ul>
        <li>
          <Link to="/settings/collection/places">Places</Link>
        </li>
      </ul>
    </div>
  );
};

export default CollectionsHome;
