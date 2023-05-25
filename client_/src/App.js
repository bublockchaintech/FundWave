import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Communities, Community, Home, Projects } from "./pages";
import { Footer, Navbar } from "./sections";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/communities/:contractAddress">
          <Community />
        </Route>
        <Route path="/communities">
          <Communities />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/previous-projects">
          <Projects />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
