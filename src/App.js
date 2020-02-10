import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/navbar-component";
import "./App.css";
import HomePage from "./components/homepage/homepage-component";
import Login from "./components/login/login-component";
import Spotify from "./components/spotify/spotify-component";
import { authenticationService } from "./components/functions/authenthication";
import { PrivateRoute } from "./components/functions/PrivateRoute";
import { history } from "./components/History";
import Admin from "./components/admin/Admin";

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: null,
      isAuth: false
    };
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);
  }
  async loadUser(token) {
    let res2 = await authenticationService.loadUser(token);
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
    authenticationService.currentUser.subscribe(x => {
      if (x) {
        this.setState({
          token: x.token
        });
        this.loadUser(x.token);
      }
    });
  }
  logout() {
    authenticationService.logout();
    history.push("/login");
    this.setState({
      token: null
    });
  }
  render() {
    const { currentUserInfo, token } = this.state;
    console.log(currentUserInfo);

    return (
      <div className="App wrapper">
        <Router history={history}>
          {token && <Navbar logout={this.logout} />}
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/"
              data={currentUserInfo}
              loadUser={this.loadUser}
              exact
              component={HomePage}
            />
            <PrivateRoute
              path="/spotify"
              data={currentUserInfo}
              component={Spotify}
            />
            <PrivateRoute
              path="/admin"
              data={currentUserInfo}
              roles={["Admin"]}
              component={Admin}
            />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
