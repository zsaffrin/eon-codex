import React, { useContext } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Firebase context provider
import { FirebaseContext } from "../../contexts/firebaseContext";

// UI Components
import { Loading } from "../ui";

// Page Components
import Header from "../Header";

// Pages
import Home from "../Home";
import Login from "../Login";
import PlayerCharacters from "../PlayerCharacters";
import Sessions from "../Sessions";
import GamingLocations from "../GamingLocations";
import Places from "../Places";
import FourOhFour from "../404";

const AppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const App = () => {
  const firebase = useContext(FirebaseContext);

  return !firebase ? (
    <Loading />
  ) : (
    <AppLayout>
      <Router>
        <Route path="*" component={Header} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />

          <Route path="/pcs" component={PlayerCharacters} />
          <Route path="/sessions" component={Sessions} />
          <Route path="/gamingLocations" component={GamingLocations} />
          <Route path="/places" component={Places} />

          <Route component={FourOhFour} />
        </Switch>
      </Router>
    </AppLayout>
  );
};

export default App;
