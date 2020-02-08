import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/navbar/navbar-component";
import "./App.css";
import HomePage from "./components/homepage/homepage-component";
import Login from "./components/login/login-component";
import Spotify from "./components/spotify/spotify-component";
import {
  login,
  logout,
  loadUser
} from "./components/functions/authenthication";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: null,
      isAuth: false
    };
  }
  async loadUser() {
    let res2 = await loadUser();
    if (res2 !== null) {
      this.setState({
        currentUserInfo: res2,
        isAuth: true
      });
    } else {
      this.setState({
        currentUserInfo: null,
        isAuth: false
      });
    }
  }
  componentDidMount() {
    //login(email, password);
    //logout();
    login("juhdo.kontiainen@hotmail.fi", "kidasasdadsdasdask");
    this.loadUser();
  }
  render() {
    const { currentUserInfo, isAuth } = this.state;

    return (
      <div className="App wrapper">
        {isAuth ? (
          <Router>
            {isAuth && <Navbar />}
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/spotify" exact component={Spotify} />
            </Switch>
          </Router>
        ) : (
          <Router>
            <Route path="/login" exact component={Login} />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
