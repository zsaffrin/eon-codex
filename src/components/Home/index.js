import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { Loading } from "../ui";

const directLinks = [
  { target: "/playerCharacters", label: "Player Characters" },
  { target: "/sessions", label: "Sessions" },
  { target: "/gamingLocations", label: "Gaming Locations" },
  { target: "/places", label: "Places" }
];

const Home = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser(firebase);

  return !userLoaded ? (
    <Loading />
  ) : user ? (
    <div>
      <div>Logged in as</div>
      <h1>{user.name}</h1>
      <div>
        <h2>Collections</h2>
        <ul>
          {directLinks.map(({ target, label }) => (
            <li key={label}>
              <Link to={target}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Settings</h2>
        <ul>
          <li>
            <Link to="/menus">Menus</Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div>
      <h1>Welcome to the Eon Codex</h1>
      <div>Work is in progress</div>
    </div>
  );
};

export default Home;
