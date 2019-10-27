import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { useCurrentUser } from "../../hooks/authHooks";
import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Loading } from "../ui";

const Identity = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser(firebase);
  const history = useHistory();

  const handleLogout = () => {
    firebase.logout();
  };

  return !userLoaded ? (
    <Loading />
  ) : user ? (
    <>
      <div>{user.name}</div>
      <div>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  ) : (
    <div>
      <Button onClick={() => history.push("/login")}>Log In</Button>
    </div>
  );
};

export default withRouter(Identity);
