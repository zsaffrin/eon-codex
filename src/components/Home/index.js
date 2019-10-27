import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { Loading } from "../ui";

import InternalHome from "./InternalHome";

const Home = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser(firebase);

  return !userLoaded ? (
    <Loading />
  ) : user ? (
    <InternalHome />
  ) : (
    <div>
      <h1>Welcome to the Eon Codex</h1>
      <div>Work is in progress</div>
    </div>
  );
};

export default Home;
