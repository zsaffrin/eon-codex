import React, { useContext } from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { UserContext } from "../../contexts";
import { Breadcrumb, Link, Loading, Page } from "../ui";

const Profile = () => {
  const { user, userLoaded } = useContext(UserContext);
  const [pcs, pcsLoading, pcsError] = useCollection("playerCharacters", [
    "player",
    "==",
    user.uid
  ]);

  return !userLoaded || pcsLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Profile", target: "/user" }
        ]}
      />
      <h1>{user.name}</h1>
      <div>
        <h2>My PCs</h2>
        <ul>
          {pcs.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/user/editPc/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};

export default Profile;
