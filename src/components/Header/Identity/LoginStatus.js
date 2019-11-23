import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext, UserContext } from "../../../contexts";
import { Button } from "../../ui";

const LoginStatus = () => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    firebase.logout();
  };

  return user ? (
    <div>
      <Button small onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  ) : (
    <div>
      <Button small onClick={() => history.push("/login")}>
        Log In
      </Button>
    </div>
  );
};

export default LoginStatus;
