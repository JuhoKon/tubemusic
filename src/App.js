import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/navbar-component";
import "./App.css";
import HomePage from "./components/homepage/homepage-component";
import Spotify from "./components/spotify/spotify-component";
function App() {
  return (
    <div className="App wrapper">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/spotify" exact component={Spotify} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
