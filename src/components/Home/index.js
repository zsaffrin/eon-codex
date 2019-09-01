import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { Button, Loading } from "../ui";
import UpcomingSessions from "./UpcomingSessions";

const directLinks = [
  { target: "/pcs", label: "Player Characters" },
  { target: "/sessions", label: "Sessions" }
];

const Home = ({ history }) => {
  const [user, userLoaded] = useCurrentUser();

  return !userLoaded ? (
    <Loading />
  ) : user ? (
    <div>
      <div>Logged in as</div>
      <h1>{user.name}</h1>
      <ul>
        {directLinks.map(({ target, label }) => (
          <li key={label}>
            <Link to={target}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <h1>Welcome to the Eon Codex</h1>
      <div>Work is in progress</div>
    </div>
  );
};

export default Home;
