import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import { useCurrentUser } from "../../hooks/authHooks";
import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Loading } from "../ui";

const Identity = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser();

  return !userLoaded ? (
    <Loading />
  ) : user ? (
    <div>
      <Button onClick={() => firebase.logout()}>Log Out</Button>
    </div>
  ) : (
    <div>
      <Button onClick={() => history.push("/login")}>Log In</Button>
    </div>
  );
};

export default withRouter(Identity);
