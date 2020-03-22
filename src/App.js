import React from "react";

import PlayerSearch from "./components/PlayerSearch";
import NavBar from "./components/NavBar";
import GameInfoContainer from "./components/GameInfoContainer";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/playersearch" exact component={PlayerSearch} />
          <Route path="/games/:gameid" exact component={GameInfoContainer} />
          <Route path="/error" exact component={Error} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
