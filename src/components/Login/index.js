import React, { useContext, useState } from "react";

import { Button, Input, VerticalList } from "../ui";
import { FirebaseContext } from "../../contexts/firebaseContext";

const Login = ({ history }) => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const firebase = useContext(FirebaseContext);

  const handleFieldUpdate = e => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await firebase.login(creds.username, creds.password);
      if (res.status === "success") {
        history.push("/");
      }
      if (res.status === "error") {
        setMessage(res.result);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={[
            {
              label: "Username",
              content: (
                <Input
                  type="text"
                  id="username"
                  value={creds.username}
                  onChange={handleFieldUpdate}
                />
              )
            },
            {
              label: "Password",
              content: (
                <Input
                  type="password"
                  id="password"
                  value={creds.password}
                  onChange={handleFieldUpdate}
                />
              )
            }
          ]}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
