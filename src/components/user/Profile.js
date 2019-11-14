import React from "react";

import { useCurrentUser } from "../../hooks/authHooks";
import { Breadcrumb, Loading, Page } from "../ui";

const Profile = () => {
  const [user, userLoaded] = useCurrentUser();

  return !userLoaded ? (
    <Loading />
  ) : (
    <Page>
      <h1>{user.name}</h1>
    </Page>
  );
};

export default Profile;
