import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/navbar-component";
import "./App.css";
import HomePage from "./components/homepage/homepage-component";
import Login from "./components/login/login-component";
import Spotify from "./components/spotify/spotify-component";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "null" //from auth
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App wrapper">
        <Router>
          {currentUser && <Navbar />}
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={HomePage} />
            <Route path="/spotify" exact component={Spotify} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
