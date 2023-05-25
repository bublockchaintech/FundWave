import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./sections/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/communities">
          <Communities />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Communities() {
  return (
    <div>
      <h2>Communities</h2>
      <p>eren</p>
      <p>eren</p>
      <p>eren</p>
      <p>eren</p>
      <p>eren</p>
      <p>eren</p>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <h2>Projects</h2>
    </div>
  );
}

export default App;
