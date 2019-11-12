import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { useCurrentUser } from "../../../hooks/authHooks";
import { FirebaseContext } from "../../../contexts/firebaseContext";
import { Button, Loading } from "../../ui";

const LoginStatus = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser(firebase);
  const history = useHistory();

  const handleLogout = () => {
    firebase.logout();
  };

  if (!userLoaded) {
    return <Loading />;
  }
  if (user) {
    return (
      <div>
        <Button small onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button small onClick={() => history.push("/login")}>
        Log In
      </Button>
    </div>
  );

  return <div>{}</div>;
};

export default LoginStatus;
