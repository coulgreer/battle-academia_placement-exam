import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../Home";
import About from "../About";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/About" component={About} />
    </Router>
  );
}

export default App;
