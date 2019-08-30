import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { FirebaseProvider } from "./contexts/firebaseContext";

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
