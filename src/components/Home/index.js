import React, { useContext } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { Loading } from "../ui";

import ExternalHome from "./ExternalHome";
import InternalHome from "./InternalHome";

const Home = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser(firebase);

  return !userLoaded ? <Loading /> : user ? <InternalHome /> : <ExternalHome />;
};

export default Home;
