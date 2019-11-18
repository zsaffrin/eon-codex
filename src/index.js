import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { FirebaseProvider, UserProvider } from "./contexts";

ReactDOM.render(
  <FirebaseProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseProvider>,
  document.getElementById("root")
);
