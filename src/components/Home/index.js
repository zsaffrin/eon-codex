import React, { useContext } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { Button, Loading } from "../ui";

const Home = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser();

  return !userLoaded ? (
    <Loading />
  ) : (
    <div>
      {user ? (
        <>
          <div>Logged in as</div>
          <h1>{user.name}</h1>
          <div>{user.uid}</div>
        </>
      ) : (
        <div>
          <div>Hey, you're not logged in, pal</div>
        </div>
      )}

      <pre>{JSON.stringify(user, " ", 2)}</pre>
    </div>
  );
};

export default Home;
