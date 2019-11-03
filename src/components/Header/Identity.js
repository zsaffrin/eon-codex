import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";

import { useCurrentUser } from "../../hooks/authHooks";
import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Loading } from "../ui";

const CenteredRow = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 0.5em;
  grid-auto-flow: column;
`;

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
    <CenteredRow>
      <div>{user.name}</div>
      <div>
        <Button small onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenteredRow>
  ) : (
    <CenteredRow>
      <Button small onClick={() => history.push("/login")}>
        Log In
      </Button>
    </CenteredRow>
  );
};

export default withRouter(Identity);
